import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  onSnapshot,
  DocumentData,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TDorm } from '@/lib/type'
import { Timestamp } from 'firebase/firestore'

const dormsCollection = collection(db, 'dorms')

export const getDormById = async (id: string): Promise<TDorm | null> => {
  const dormDoc = doc(db, 'dorms', id)
  const snapshot = await getDoc(dormDoc)
  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      phoneNumber: snapshot.data().phone_number,
      thumbnail: snapshot.data().images,
      ...snapshot.data(),
    } as TDorm
  } else {
    return null
  }
}

export const getDorms = async () => {
  const snapshot = await getDocs(dormsCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
    return {
      id: doc.id,
      ...data,
      timestamp: timestamp,
      thumbnail: data.images,
      phoneNumber: data.phone_number,
    } as TDorm
  })
}

export const addDorm = async (post: any) => {
  await addDoc(dormsCollection, post)
}

export const updateDorm = async (id: string, updatedPost: Partial<TDorm>) => {
  const postDoc = doc(db, 'dorms', id)
  await updateDoc(postDoc, updatedPost)
}

export const deleteDorm = async (id: string) => {
  const postDoc = doc(db, 'dorms', id)
  await deleteDoc(postDoc)
}

export const subscribeToDorms = (callback: (dorms: TDorm[]) => void) => {
  return onSnapshot(dormsCollection, (snapshot) => {
    const dorms: TDorm[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
      return {
        id: doc.id,
        ...data,
        timestamp: timestamp,
        thumbnail: data.images,
        phoneNumber: data.phone_number,
      } as TDorm
    })
    callback(dorms)
  })
}
