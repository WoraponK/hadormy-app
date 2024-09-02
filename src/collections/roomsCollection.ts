import { collection, getDocs, doc, addDoc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase/firestore'

const getDormRoomCollection = (dormId: string) => {
  return collection(db, 'dorms', dormId, 'rooms')
}

export const subscribeToRooms = (dormId: string, callback: (notifications: any[]) => void) => {
  const roomsCollection = getDormRoomCollection(dormId)
  return onSnapshot(roomsCollection, (snapshot) => {
    const rooms: any[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
      }
    })
    callback(rooms)
  })
}

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

  const startingRoomNumber = 100

  for (let i = 0; i < amount; i++) {
    const roomNumber = startingRoomNumber + i + 1
    const roomData = {
      name: `${roomNumber}`,
      price: price,
      isAvailable: true,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    }

    await addDoc(roomDocs, roomData)
  }
}

export const updateRoom = async (dormId: string, roomId: string, updatedData: any) => {
  const roomDocRef = doc(db, 'dorms', dormId, 'rooms', roomId)

  const dataToUpdate = {
    ...updatedData,
    updated_at: Timestamp.now(),
  }

  await updateDoc(roomDocRef, dataToUpdate)
}

export const getRoomMembershipByUserId = async (dormId: string, userId: string) => {
  try {
    const roomsCollection = getDormRoomCollection(dormId)
    const roomsSnapshot = await getDocs(roomsCollection)

    for (const roomDoc of roomsSnapshot.docs) {
      const userRef = roomDoc.data().user
      if (userRef) {
        const userDocSnapshot = await getDoc(userRef)

        if (userDocSnapshot.exists() && userDocSnapshot.id === userId) {
          return true
        }
      }
    }

    return false
  } catch (error) {
    console.error('Error checking room membership:', error)
    throw new Error('Failed to check room membership')
  }
}
