import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';

export interface Institution {
  id: string;
  name: string;
  region: string;
  type: string;
  isVerified: boolean;
  programmes: string[];
}

export async function fetchInstitutions(): Promise<Institution[]> {
  const path = 'institutions';
  try {
    const querySnapshot = await getDocs(collection(db, path));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Institution[];
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function searchInstitutions(filters: { region?: string, type?: string, programme?: string }): Promise<Institution[]> {
  const allInstitutions = await fetchInstitutions();
  
  return allInstitutions.filter(inst => {
    const matchRegion = !filters.region || inst.region === filters.region;
    const matchType = !filters.type || inst.type === filters.type;
    const matchProgramme = !filters.programme || inst.programmes.some(p => p.toLowerCase().includes(filters.programme!.toLowerCase()));
    
    return matchRegion && matchType && matchProgramme;
  });
}
