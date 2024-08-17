import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TCardAnnounce } from '@/lib/type'
import { Timestamp } from 'firebase/firestore'

const announcementsCollection = collection(db, 'announcements')

export const getAnnounces = async (): Promise<TCardAnnounce[]> => {
  const snapshot = await getDocs(announcementsCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
    return { id: doc.id, ...data, timestamp: timestamp } as TCardAnnounce
  })
}

export const addAnnouce = async (post: TCardAnnounce) => {
  await addDoc(announcementsCollection, post)
}

export const updateAnnouce = async (id: string, updatedPost: Partial<TCardAnnounce>) => {
  const postDoc = doc(db, 'announcements', id)
  await updateDoc(postDoc, updatedPost)
}

export const deleteAnnouce = async (id: string) => {
  const postDoc = doc(db, 'announcements', id)
  await deleteDoc(postDoc)
}
