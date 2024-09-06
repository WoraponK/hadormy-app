import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot, where, query } from 'firebase/firestore'
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

export const subscribeToAnnounces = (callback: (dorms: TCardAnnounce[]) => void) => {
  return onSnapshot(announcementsCollection, (snapshot) => {
    const dorms: TCardAnnounce[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
      return { id: doc.id, ...data, timestamp: timestamp } as TCardAnnounce
    })
    callback(dorms)
  })
}

export const addAnnouce = async (post: TCardAnnounce) => {
  try {
    const docRef = await addDoc(announcementsCollection, post)
    return docRef.id
  } catch (error) {
    console.error('Error adding announcement:', error)
  }
}

export const updateAnnouce = async (id: string, updatedAnnouce: Partial<TCardAnnounce>) => {
  const announceDoc = doc(db, 'announcements', id)
  await updateDoc(announceDoc, updatedAnnouce)
}

export const deleteAnnouce = async (id: string) => {
  const announceDoc = doc(db, 'announcements', id)
  await deleteDoc(announceDoc)
}

export const deleteAllUserAnnouncements = async (userId: string) => {
  const announcementsRef = collection(db, 'announcements')
  const q = query(announcementsRef, where('user_id', '==', userId)) // Adjust 'userId' to the actual field name used in your announcements collection

  try {
    const querySnapshot = await getDocs(q)
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref))

    await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error deleting announcements:', error)
  }
}
