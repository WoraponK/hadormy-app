import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { getFunctions, httpsCallable } from 'firebase/functions'
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

export const addAnnouce = async (post: TCardAnnounce, deleteDelay: number) => {
  try {
    const docRef = await addDoc(announcementsCollection, post)
    console.log(`Announcement added with ID: ${docRef.id}`)

    await deleteDataWithDelay(docRef.id, deleteDelay)
  } catch (error) {
    console.error('Error adding announcement:', error)
  }
}

const deleteDataWithDelay = async (docId: string, delay: number) => {
  const functions = getFunctions()
  const deleteDocument = httpsCallable(functions, 'deleteDocumentAfterDelay')

  try {
    const result = await deleteDocument({ docId, delay })
    console.log(result.data) // Handle the response
  } catch (error) {
    console.error('Error deleting document:', error)
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
