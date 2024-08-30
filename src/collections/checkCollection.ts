import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  query,
  DocumentReference,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

const userCollection = collection(db, 'users')

export const checkHaveDorm = async (id: string): Promise<boolean | null> => {
  const q = query(userCollection, where('id', '==', id))

  try {
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      const data = userDoc.data()
      return data.owner_dorm ? true : false
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user by id:', error)
    return null
  }
}

export const getDormIdByUserId = async (parentId: string) => {
  const q = query(userCollection, where('id', '==', parentId))

  try {
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      const data = userDoc.data()

      // Check if owner_dorm is a valid DocumentReference before using getDoc
      const dormRef = data?.owner_dorm as DocumentReference
      if (dormRef) {
        const dormDoc = await getDoc(dormRef)
        return dormDoc.exists() ? dormDoc.id : null
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching dorm by user id:', error)
    return null
  }
}
