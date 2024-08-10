import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TUser } from '@/lib/type'

const usersCollection = collection(db, 'users')

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