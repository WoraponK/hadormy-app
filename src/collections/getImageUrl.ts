import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase'

export const getImageUrl = async (path: string): Promise<string> => {
  if (!path) {
    throw new Error('Path is required to get the image URL.')
  }

  try {
    const imageRef = ref(storage, path)
    const url = await getDownloadURL(imageRef)
    return url
  } catch (error) {
    console.error('Error getting image URL:', error)
    throw new Error(`Failed to get image URL for path: ${path}`)
  }
}
