'use client'
import { useEffect, useState } from 'react'
import Image, { ImageProps as NextImageProps } from 'next/image' // Import the Next.js Image component and its props type
import { getImageUrl } from '@/collections/getImageUrl'

import { imagePlaceholder } from '@/lib/others'

interface FirebaseImageProps extends Partial<NextImageProps> {
  imagePath: string
}

const FirebaseImage: React.FC<FirebaseImageProps> = ({
  imagePath,
  alt = 'Firebase Image',
  width = 500,
  height = 300,
  ...props
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getImageUrl(imagePath)
        setImageUrl(url)
      } catch (error) {
        console.error('Failed to fetch image URL:', error)
      }
    }

    fetchImageUrl()
  }, [imagePath])

  if (!imageUrl) return <Image src={imagePlaceholder} alt={alt} width={width} height={height} {...props} />

  return <Image src={imageUrl} alt={alt} width={width} height={height} {...props} />
}

export default FirebaseImage
