import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TDorm } from '@/lib/type'
import { Timestamp } from 'firebase/firestore'

const dormsCollection = collection(db, 'dorms')

export const getDorms = async (): Promise<TDorm[]> => {
  const snapshot = await getDocs(dormsCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
    return { id: doc.id, ...data, timestamp: timestamp } as TDorm
  })
}

export const addDorm = async (post: TDorm) => {
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
