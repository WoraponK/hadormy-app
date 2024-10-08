// Lib
import React from 'react'
import Link from 'next/link'

// Images
import { MdDirectionsRun } from 'react-icons/md'

// Include in project
import { convertNumberToString, calDistance } from '@/lib/others'
import FirebaseImage from '@/components/common/FirebaseImage'

type Props = {
  id?: string | number
  name: string
  images: string
  priceStart: number
  priceEnd: number
  distance: number
}

const CardDormSearch: React.FC<Props> = ({ id, name, images, priceStart, priceEnd, distance }) => {
  return (
    <Link
      href={`/dorm/${id}`}
      className="h-full max-h-16 max-md:max-h-24 max-md:h-fit w-full flex space-x-2 items-center shadow rounded-md group overflow-hidden"
    >
      <FirebaseImage
        imagePath={images}
        alt={name}
        className="min-h-16 max-md:min-h-24 object-cover object-center w-20"
      />
      <div className="px-2 max-md:p-2 w-full">
        <h6 className="text-primary line-clamp-1 underline-offset-2 group-hover:underline max-md:text-center">
          {name}
        </h6>
        <div className="grid grid-cols-[60%_40%] items-center max-md:grid-cols-1">
          <h5 className="max-md:text-center">
            {convertNumberToString(priceStart)} - {convertNumberToString(priceEnd)}{' '}
          </h5>
          <p className="text-sm text-gray-500 flex items-center space-x-1 justify-self-end max-md:justify-self-center">
            <MdDirectionsRun /> <span>~{calDistance(distance)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardDormSearch
