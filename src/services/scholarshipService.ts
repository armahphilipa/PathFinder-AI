import { collection, getDocs } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface Scholarship {
  id: string;
  provider: string;
  title: string;
  value: string;
  deadline: string;
  eligibility: {
    regions?: string[];
    educationLevels?: string[];
    financialNeed?: boolean;
    interests?: string[];
    minGrade?: string;
    pathwayType?: string;
  };
}

export interface ScholarshipMatch {
  scholarshipId: string;
  matchScore: number;
  reason: string;
}

export async function fetchScholarships(): Promise<Scholarship[]> {
  const path = 'scholarships';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Scholarship[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return []; // Never reached but for TS
  }
}

export async function matchScholarships(profile: any, careers: string[], scholarships: Scholarship[]): Promise<ScholarshipMatch[]> {
  if (scholarships.length === 0) return [];

  const prompt = `
    You are a scholarship matching expert for Ghanaian students.
    Match the following student profile and their target careers against the available scholarships.
    
    Student Profile:
    - Region: ${profile.region}
    - Education Level: ${profile.educationLevel}
    - Financial Need Specified: ${profile.financialNeed ? 'Yes' : 'No'}
    - Interests: ${profile.interests.join(', ')}
    - Grades (1 is best): ${JSON.stringify(profile.grades)}
    
    Target Careers:
    ${careers.join(', ')}
    
    Available Scholarships:
    ${JSON.stringify(scholarships.map(s => ({
      id: s.id,
      title: s.title,
      provider: s.provider,
      eligibility: s.eligibility
    })))}
    
    Constraints:
    - Match based on eligibility criteria (region, level, need, etc).
    - Provide a matchScore (0-100) and a short reason.
    - RESPOND ONLY WITH VALID JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              scholarshipId: { type: Type.STRING },
              matchScore: { type: Type.NUMBER },
              reason: { type: Type.STRING }
            },
            required: ['scholarshipId', 'matchScore', 'reason']
          }
        }
      }
    });

    const text = response.text?.trim();
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (e) {
    console.error("Scholarship Matching AI Error:", e);
    return [];
  }
}
