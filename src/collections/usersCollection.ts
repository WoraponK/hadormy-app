import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  query,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db, storage } from '@/lib/firebase'
import { TUser } from '@/lib/type'
import { ref, deleteObject, listAll } from 'firebase/storage'
import { deleteAllUserAnnouncements } from './announcementCollection'

const usersCollection = collection(db, 'users')

const deleteAllFilesInFolder = async (folderRef: any) => {
  try {
    const result = await listAll(folderRef) // Get all files in the folder

    const deletePromises = result.items.map((fileRef: any) => deleteObject(fileRef)) // Delete each file
    await Promise.all(deletePromises)
  } catch (error) {
    console.error('Error deleting files in folder:', error)
  }
}

export const getUserById = async (id: string): Promise<TUser | null> => {
  const usersCollection = collection(db, 'users')
  const q = query(usersCollection, where('id', '==', id))

  try {
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      const data = userDoc.data()
      const timestamp = `${data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)}`
      return { id: userDoc.id, ...userDoc.data(), created_at: timestamp } as TUser
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user by id:', error)
    return null
  }
}

export const getUsers = async (): Promise<TUser[]> => {
  const snapshot = await getDocs(usersCollection)
  return snapshot.docs.map((doc) => {
    const data = doc.data()
    const timestamp = `${data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)}`
    return { id: doc.id, ...doc.data(), created_at: timestamp, phone: data.phone } as TUser
  })
}

export const addUser = async (user: TUser) => {
  await addDoc(usersCollection, user)
}

export const updateUser = async (id: string, updatedUser: any) => {
  const userDoc = doc(db, 'users', id)
  await updateDoc(userDoc, updatedUser)
}

export const deleteUser = async (id: string) => {
  const userDoc = doc(db, 'users', id)

  try {
    const userSnapshot = await getDoc(userDoc)
    if (!userSnapshot.exists()) {
      console.error('User does not exist.')
      return
    }

    const userData = userSnapshot.data()

    const dormRef = userData.owner_dorm

    if (dormRef) {
      await deleteDoc(dormRef)
    }

    const notificationsCollection = collection(db, 'users', id, 'notifications')
    const notificationsSnapshot = await getDocs(query(notificationsCollection))
    const deleteNotificationsPromises = notificationsSnapshot.docs.map((notiDoc) => {
      return deleteDoc(doc(db, 'users', id, 'notifications', notiDoc.id))
    })
    await Promise.all(deleteNotificationsPromises)

    await deleteAllUserAnnouncements(id)

    const dormFolderRef = ref(storage, `dorms/${id}/`)
    const annoucneFolderRef = ref(storage, `announcements/${id}/`)
    await deleteAllFilesInFolder(dormFolderRef)
    await deleteAllFilesInFolder(annoucneFolderRef)

    await deleteDoc(userDoc)
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

export const listenToUserById = (id: string, callback: (user: TUser | null) => void) => {
  const userDocRef = doc(db, 'users', id)

  const unsubscribe = onSnapshot(
    userDocRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data()
        const timestamp = `${
          data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)
        }`
        const user = { id: doc.id, ...doc.data(), created_at: timestamp, phone: data.phone } as TUser
        callback(user)
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error('Error listening to user:', error)
      callback(null)
    },
  )

  return unsubscribe
}

export const listenToUsers = (callback: (users: TUser[]) => void) => {
  const unsubscribe = onSnapshot(
    usersCollection,
    (snapshot) => {
      const users = snapshot.docs.map((doc) => {
        const data = doc.data()
        const timestamp = `${
          data.created_at instanceof Timestamp ? data.created_at.toDate() : new Date(data.created_at)
        }`
        return { id: doc.id, ...doc.data(), created_at: timestamp, phone: data.phone } as TUser
      })
      callback(users)
    },
    (error) => {
      console.error('Error listening to users:', error)
      callback([])
    },
  )

  return unsubscribe
}

// Call this function to stop listening when needed
export const stopListeningToUser = (unsubscribe: () => void) => {
  if (unsubscribe) {
    unsubscribe()
  }
}
