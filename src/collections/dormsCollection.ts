import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  limit,
  query,
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

export const getDorms = async (limitCount: number) => {
  const dormsQuery = query(dormsCollection, limit(limitCount))
  const snapshot = await getDocs(dormsQuery)
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
  try {
    const postDoc = doc(db, 'dorms', id)
    const roomsCollection = collection(db, 'dorms', id, 'rooms')
    const ratingsCollection = collection(db, 'dorms', id, 'ratings')
    const roomBookingCollection = collection(db, 'dorms', id, 'room_booking')

    const roomsSnapshot = await getDocs(query(roomsCollection))
    const ratingsSnapshot = await getDocs(query(ratingsCollection))
    const roomBookingSnapshot = await getDocs(query(roomBookingCollection))

    const deleteRoomPromises = roomsSnapshot.docs.map((roomDoc) => {
      return deleteDoc(doc(db, 'dorms', id, 'rooms', roomDoc.id))
    })

    const deleteRatingsPromises = ratingsSnapshot.docs.map((ratingDoc) => {
      return deleteDoc(doc(db, 'dorms', id, 'ratings', ratingDoc.id))
    })

    const deleteRoomBookingPromises = roomBookingSnapshot.docs.map((roomBookingDoc) => {
      return deleteDoc(doc(db, 'dorms', id, 'room_booking', roomBookingDoc.id))
    })

    await Promise.all(deleteRoomPromises)
    await Promise.all(deleteRatingsPromises)
    await Promise.all(deleteRoomBookingPromises)

    await deleteDoc(postDoc)
  } catch (error) {
    console.error(error)
  }
}

export const subscribeToDorms = (callback: (dorms: TDorm[]) => void) => {
  return onSnapshot(dormsCollection, (snapshot) => {
    const dorms: TDorm[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      const timestamp = `${data.timestamp instanceof Timestamp ? data.timestamp.toDate() : new Date(data.timestamp)}`
      const updated_at = `${
        data.updated_at instanceof Timestamp ? data.updated_at.toDate() : new Date(data.updated_at)
      }`
      return {
        id: doc.id,
        ...data,
        timestamp: timestamp,
        updated_at: updated_at,
        thumbnail: data.images,
        phoneNumber: data.phone_number,
      } as TDorm
    })
    callback(dorms)
  })
}
