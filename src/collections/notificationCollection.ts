import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { TNotification } from '@/lib/type'
import { Timestamp } from 'firebase/firestore'

const getUserNotificationsCollection = (userId: string) => {
  return collection(db, 'users', userId, 'notifications')
}

export const addNotification = async (userId: string, post: any) => {
  const notificationsCollection = getUserNotificationsCollection(userId)
  await addDoc(notificationsCollection, post)
}

const getAdminUsers = async () => {
  const usersCollection = collection(db, 'users')
  const q = query(usersCollection, where('role', '==', 'ADMIN'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map((doc) => doc.id)
}

export const addNotificationForAdminUsers = async (post: any) => {
  const adminUserIds = await getAdminUsers()

  await Promise.all(adminUserIds.map((userId) => addNotification(userId, post)))
}

export const updateNotification = async (
  userId: string,
  notificationId: string,
  updatedPost: Partial<TNotification>,
) => {
  const notificationDoc = doc(db, 'users', userId, 'notifications', notificationId)
  await updateDoc(notificationDoc, updatedPost)
}

export const deleteNotification = async (userId: string, notificationId: string) => {
  const notificationDoc = doc(db, 'users', userId, 'notifications', notificationId)
  await deleteDoc(notificationDoc)
}

export const subscribeToNotifications = (userId: string, callback: (notifications: TNotification[]) => void) => {
  const notificationsCollection = getUserNotificationsCollection(userId)
  return onSnapshot(notificationsCollection, (snapshot) => {
    const dorms: TNotification[] = snapshot.docs.map((doc) => {
      const data = doc.data()
      const timestamp = `${data.updateAt instanceof Timestamp ? data.updateAt.toDate() : new Date(data.updateAt)}`
      return {
        id: doc.id,
        ...data,
        updateAt: timestamp,
      } as TNotification
    })
    callback(dorms)
  })
}
