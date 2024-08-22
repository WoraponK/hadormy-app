import { collection, getDocs, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const getRooms = async (parentId: string) => {
  const parentDocRef = doc(db, 'dorms', parentId)
  const roomDocs = collection(parentDocRef, 'rooms')
  const querySnapshot = await getDocs(roomDocs)

  const documents = querySnapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
    }
  })

  return documents
}
