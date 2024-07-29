// Lib
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Images
import { MdDirectionsRun } from 'react-icons/md'

// Include in project
import { convertNumberToString, calDistance } from '@/lib/others'

type Props = {
  id?: string | number
  name: string
  thumbnail?: string
  priceStart: number
  priceEnd: number
  distance: number
}

const CardDormSearch: React.FC<Props> = ({ id, name, thumbnail, priceStart, priceEnd, distance }) => {
  return (
    <Link
      href={`/dorm/${id}`}
      className="h-16 w-full flex space-x-2 items-center shadow rounded-md group overflow-hidden"
    >
      <Image
        src={thumbnail as string}
        alt={name}
        width={80}
        height={60}
        className="object-cover object-center h-full"
      />
      <div className="px-2 w-full">
        <h6 className="text-primary line-clamp-1 underline-offset-2 group-hover:underline">{name}</h6>
        <div className="grid grid-cols-[60%_40%] items-center">
          <h5>
            {convertNumberToString(priceStart)} - {convertNumberToString(priceEnd)}{' '}
          </h5>
          <p className="text-sm text-gray-500 flex items-center space-x-1 justify-self-end">
            <MdDirectionsRun /> <span>~{calDistance(distance)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardDormSearch
