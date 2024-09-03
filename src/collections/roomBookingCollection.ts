import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, getDocs, where, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Timestamp } from 'firebase/firestore'

const getDormRoomBookingCollection = (dormId: string) => {
  return collection(db, 'dorms', dormId, 'room_booking')
}

export const getRoomBookings = async (dormId: string) => {
  const roomBookingCollection = getDormRoomBookingCollection(dormId)
  const snapshot = await getDocs(roomBookingCollection)

  const roomBookings: any[] = snapshot.docs.map((doc) => {
    const data = doc.data()
    const timestamp = `${data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)}`
    return {
      id: doc.id,
      ...data,
      created_at: timestamp,
    }
  })

  return roomBookings
}

export const addRoomBooking = async (dormId: string, post: any) => {
  const roomBookingCollection = getDormRoomBookingCollection(dormId)
  await addDoc(roomBookingCollection, post)
}

export const updateRoomBooking = async (dormId: string, roomBookingId: string, updatedPost: Partial<any>) => {
  const roomBookingDoc = doc(db, 'dorms', dormId, 'room_booking', roomBookingId)
  await updateDoc(roomBookingDoc, updatedPost)
}

export const deleteRoomBooking = async (dormId: string, roomBookingId: string) => {
  const roomBookingDoc = doc(db, 'dorms', dormId, 'room_booking', roomBookingId)
  await deleteDoc(roomBookingDoc)
}

export const subscribeToRoomBookings = (dormId: string, callback: (roomBookings: any[]) => void) => {
  const roomBookingCollection = getDormRoomBookingCollection(dormId)
  return onSnapshot(roomBookingCollection, (snapshot) => {
    const roomBookings: any[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      const timestamp = `${data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)}`
      return {
        id: doc.id,
        ...data,
        created_at: timestamp,
      }
    })
    callback(roomBookings)
  })
}

export const subscribeToRoomIdByUserId = (
  dormId: string,
  userId: string,
  callback: (roomId: string | null) => void,
) => {
  const roomBookingCollection = getDormRoomBookingCollection(dormId)

  const q = query(roomBookingCollection, where('user_id', '==', userId))

  return onSnapshot(q, (snapshot) => {
    if (!snapshot.empty) {
      const roomBookingDoc = snapshot.docs[0]
      const data = roomBookingDoc.data()
      const roomId = data.room_id || null
      callback(roomId)
    } else {
      callback(null)
    }
  })
}
