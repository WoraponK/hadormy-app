// Lib
import React from 'react'
import Image from 'next/image'

// Images
import IconVerifiedSVG from '@/images/common/icon-verified.svg'
import { MdDirectionsRun } from 'react-icons/md'
import { imagePlaceholder } from '@/lib/others'

// Include in project
import { convertNumberToString, convertDateFormat, calDistance } from '@/lib/others'

type Props = {
  name: string
  thumbnail?: string
  address: string
  priceStart: number
  priceEnd: number
  timestamp: string
  distance: number
  onClick?: () => void
}

const CardDorm: React.FC<Props> = ({
  name,
  thumbnail = imagePlaceholder,
  address,
  priceStart,
  priceEnd,
  timestamp,
  distance,
  onClick,
}) => {
  return (
    <div
      className="h-[190px] w-full shadow-md rounded-lg p-4 grid grid-cols-[200px_1fr] gap-8 cursor-pointer group max-md:flex max-md:flex-col max-md:h-fit max-md:gap-4"
      onClick={onClick}
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="h-[120px] w-full rounded-lg shadow-md overflow-hidden">
          <Image
            src={thumbnail}
            alt={`${name}-ตัวอย่าง`}
            className="transition-transform group-hover:scale-110 h-full w-full object-cover object-center"
            loading="lazy"
            width={200}
            height={120}
          />
        </div>
        <div className="flex justify-center items-center gap-2 max-md:justify-start">
          <Image src={IconVerifiedSVG} alt="IconVerifiedSVG" />
          <h5 className="text-success">ลงทะเบียนที่พักแล้ว</h5>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="text-primary underline-offset-4 group-hover:underline line-clamp-1">{name}</h3>
          <p className="text-gray-500 line-clamp-1">{address}</p>
          <div className="flex items-end space-x-2">
            <h5>
              {convertNumberToString(priceStart)} - {convertNumberToString(priceEnd)}
            </h5>
            <p className="text-gray-500 max-md:hidden">บาท/เดือน</p>
          </div>
        </div>
        <p className="text-gray-500 line-clamp-2">ประกาศ: {convertDateFormat(timestamp)}</p>
        <p className="text-gray-500 flex place-self-end items-center space-x-1">
          <MdDirectionsRun className="text-xl" />
          <span>
            <span className="max-md:hidden">ห่างจากหน้ามหาลัย</span> ~{calDistance(distance)}
          </span>
        </p>
      </div>
    </div>
  )
}

export default CardDorm