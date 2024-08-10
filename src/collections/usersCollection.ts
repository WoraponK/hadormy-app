import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, where, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TUser } from '@/lib/type'

const usersCollection = collection(db, 'users')

export const getUserById = async (id: string): Promise<TUser | null> => {
  const usersCollection = collection(db, 'users')
  const q = query(usersCollection, where('id', '==', id))

  try {
    const querySnapshot = await getDocs(q)
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0]
      return { id: userDoc.id, ...userDoc.data(), password: 'YOU DONT WANNA KNOW!' } as TUser
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
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TUser))
}

export const addUser = async (user: TUser) => {
  await addDoc(usersCollection, user)
}

export const updateUser = async (id: string, updatedUser: TUser) => {
  const userDoc = doc(db, 'users', id)
  await updateDoc(userDoc, updatedUser)
}

export const deleteUser = async (id: string) => {
  const userDoc = doc(db, 'users', id)
  await deleteDoc(userDoc)
}
