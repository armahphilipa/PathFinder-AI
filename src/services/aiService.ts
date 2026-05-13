/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAi() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  sector: string;
  details: string;
  matchScore: number;
  salaryRange: string;
  outlook: string;
  confidenceScore: number;
  rationale: string;
  futureProof: boolean;
  pathwayType: 'Academic' | 'Vocational';
  roadmapPreview: string[];
  fullRoadmapSteps: {
    title: string;
    description: string;
    estimatedTime: string;
    type: 'education' | 'skill' | 'experience' | 'milestone';
  }[];
}

// Utility to retry AI calls on transient network errors
async function withRetry<T>(fn: () => Promise<T>, retries = 2, delay = 1000): Promise<T> {
  try {
    return await fn();
  } catch (err: any) {
    if (retries > 0 && (err.message?.includes('xhr error') || err.message?.includes('500') || err.message?.includes('code 6') || err.message?.includes('400'))) {
      console.warn(`AI Call failed, retrying... (${retries} left) Error: ${err.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw err;
  }
}

export async function generateCareerMatches(profile: any): Promise<CareerRecommendation[]> {
  const prompt = `
    You are PathFinder AI, a career guidance expert for Ghanaian youth.
    Analyze the following student profile and recommend the top 3 career paths in Ghana.
    
    Student Profile:
    - Name: ${profile.name}
    - Age: ${profile.age}
    - Region: ${profile.region} (Tailor demand to this region where possible)
    - Education Level: ${profile.educationLevel}
    - Grades: ${JSON.stringify(profile.grades)} (1 is Excellent, 5 is Struggling)
    - Aptitude Responses: ${JSON.stringify(profile.aptitudeAnswers)}
    - Interests: ${profile.interests.join(', ')}
    - Preferred Pathway: ${profile.pathwayType}
    - Income Target: GHS ${profile.incomeTarget}
    - Language: ${profile.language}
    
    Constraints:
    - Focus on the Ghanaian labour market.
    - Identify "Future-Proof" careers (growth > 15%).
    - Be encouraging but realistic.
    - Provide a human-readable roadmap preview for each.
    - For the "fullRoadmapSteps", provide a detailed, sequence-based guide from their CURRENT status (${profile.educationLevel}) all the way to professional employment.
    - Include specific Ghanaian institutions or companies where relevant.
    - RESPOND ONLY WITH VALID JSON.
  `;

  return withRetry(async () => {
    const ai = getAi();
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
              id: { type: Type.STRING, description: "A unique kebab-case identifier (e.g., 'software-engineer')" },
              title: { type: Type.STRING },
              sector: { type: Type.STRING },
              details: { type: Type.STRING, description: "Detailed vocational or academic advice for this path." },
              matchScore: { type: Type.NUMBER },
              salaryRange: { type: Type.STRING },
              outlook: { type: Type.STRING },
              confidenceScore: { type: Type.NUMBER },
              rationale: { type: Type.STRING },
              futureProof: { type: Type.BOOLEAN },
              pathwayType: { type: Type.STRING, enum: ['Academic', 'Vocational'] },
              roadmapPreview: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              fullRoadmapSteps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    estimatedTime: { type: Type.STRING },
                    type: { type: Type.STRING, enum: ['education', 'skill', 'experience', 'milestone'] }
                  },
                  required: ['title', 'description', 'estimatedTime', 'type']
                }
              }
            },
            required: ['id', 'title', 'sector', 'details', 'matchScore', 'salaryRange', 'outlook', 'confidenceScore', 'rationale', 'futureProof', 'pathwayType', 'roadmapPreview', 'fullRoadmapSteps']
          }
        }
      }
    });

    const text = response.text?.trim();
    if (!text) throw new Error("Empty response from AI");
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("The AI returned an invalid format. Please try again.");
    }
  });
}
