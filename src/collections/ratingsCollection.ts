import { collection, doc, addDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const getDormRatingsCollection = (dormId: string) => {
  return collection(db, 'dorms', dormId, 'ratings')
}

export const getRatings = (dormId: string, callback: (averageScore: number) => void) => {
  const ratingsCollection = getDormRatingsCollection(dormId)

  // Set up a real-time listener
  const unsubscribe = onSnapshot(ratingsCollection, (querySnapshot) => {
    let totalScore = 0
    const ratingsCount = querySnapshot.docs.length

    querySnapshot.docs.forEach((doc) => {
      const data = doc.data()
      let score = 0

      switch (data.rate) {
        case 'ONE':
          score = 1
          break
        case 'TWO':
          score = 2
          break
        case 'THREE':
          score = 3
          break
        case 'FOUR':
          score = 4
          break
        case 'FIVE':
          score = 5
          break
        default:
          score = 0
          break
      }

      totalScore += score
    })

    const averageScore = ratingsCount > 0 ? totalScore / ratingsCount : 0

    callback(averageScore)
  })

  return unsubscribe
}

export const addRating = async (dormId: string, userId: string, rate: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE') => {
  try {
    const parentDocRef = doc(db, 'dorms', dormId)
    const userDocRef = doc(db, 'users', userId)
    const ratingsCollectionRef = collection(parentDocRef, 'ratings')

    await addDoc(ratingsCollectionRef, {
      rate,
      user: userDocRef,
    })
  } catch (error) {
    console.error('Error adding rating: ', error)
  }
}

// export const getIsRatedByUserId = async (dormId: string, userId: string) => {
//   try {
//     const roomsCollection = getDormRatingsCollection(dormId)
//     const roomsSnapshot = await getDocs(roomsCollection)

//     for (const roomDoc of roomsSnapshot.docs) {
//       const userRef = roomDoc.data().user
//       if (userRef) {
//         const userDocSnapshot = await getDoc(userRef)

//         if (userDocSnapshot.exists() && userDocSnapshot.id === userId) {
//           return true
//         }
//       }
//     }

//     return false
//   } catch (error) {
//     console.error('Error checking room membership:', error)
//     throw new Error('Failed to check room membership')
//   }
// }

export const getIsRatedByUserId = (dormId: string, userId: string, callback: (isRated: boolean) => void) => {
  try {
    const roomsCollection = getDormRatingsCollection(dormId);
    
    // Set up a real-time listener
    const unsubscribe = onSnapshot(roomsCollection, (roomsSnapshot) => {
      let isRated = false;

      for (const roomDoc of roomsSnapshot.docs) {
        const userRef = roomDoc.data().user;
        if (userRef) {
          // Check if the userRef matches the userId
          if (userRef.id === userId) {
            isRated = true;
            break;
          }
        }
      }

      // Call the callback with the current rating status
      callback(isRated);
    });

    // Return the unsubscribe function to stop listening when needed
    return unsubscribe;
  } catch (error) {
    console.error('Error checking room membership:', error);
    throw new Error('Failed to check room membership');
  }
}
