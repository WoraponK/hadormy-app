import { collection, getDocs, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const getRatings = async (parentId: string) => {
  const parentDocRef = doc(db, 'dorms', parentId)
  const ratingDocs = collection(parentDocRef, 'ratings')
  const querySnapshot = await getDocs(ratingDocs)

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

  return averageScore
}
