import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const userRolesCollection = collection(db, 'userRoles');

export async function setUserRole(userId: string, role: string): Promise<void> {
  await setDoc(doc(userRolesCollection, userId), { role });
}

export async function getUserRole(userId: string): Promise<string | null> {
  const userRoleDoc = doc(userRolesCollection, userId);
  const docSnap = await getDoc(userRoleDoc);
  return docSnap.exists() ? docSnap.data().role : null;
}
