import { collection, getDocs, getDoc, where, query, DocumentReference, doc } from 'firebase/firestore'

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

export const getUserIdByDormId = async (parentId: string) => {
  try {
    // Reference to the dorm document
    const dormDocRef = doc(db, 'dorms', parentId)
    const dormDoc = await getDoc(dormDocRef)

    if (dormDoc.exists()) {
      const dormData = dormDoc.data()

      // Check if owner_dorm is a valid DocumentReference
      const ownerDormRef = dormData?.owner as DocumentReference

      if (ownerDormRef) {
        const userDoc = await getDoc(ownerDormRef)
        return userDoc.exists() ? userDoc.id : null
      } else {
        return null
      }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user ID by dorm ID:', error)
    return null
  }
}