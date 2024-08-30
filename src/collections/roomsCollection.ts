import { collection, getDocs, doc, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase/firestore'

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

export const addRoom = async (parentId: string, room: any) => {
  const parentDocRef = doc(db, 'dorms', parentId)
  const roomDocs = collection(parentDocRef, 'rooms')

  await addDoc(roomDocs, room)
}

export const addRoomsByAmount = async (parentId: string, amount: number, price: number) => {
  const parentDocRef = doc(db, 'dorms', parentId)
  const roomDocs = collection(parentDocRef, 'rooms')

  for (let i = 0; i < amount; i++) {
    const roomData = {
      name: `${i + 1}`,
      price: price,
      isAvailable: true,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }

    await addDoc(roomDocs, roomData)
  }
}
