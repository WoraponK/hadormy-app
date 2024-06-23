/* eslint-disable @next/next/no-img-element */
// Lib
import React from 'react'
import Image from 'next/image'

// Images
import IconVerifiedSVG from '@/images/common/icon-verified.svg'
import { MdDirectionsRun } from 'react-icons/md'

// Include in project
import { convertNumberToString, convertDateFormat, calDistance } from '@/lib/others'

type Props = {
  name: string
  thumbnail: string
  address: string
  priceStart: number
  priceEnd: number
  timestamp: string
  distance: number
  onClick?: () => void
}

const CardDorm: React.FC<Props> = ({
  name,
  thumbnail,
  address,
  priceStart,
  priceEnd,
  timestamp,
  distance,
  onClick,
}) => {
  return (
    <div
      className="h-[190px] w-full shadow-md rounded-lg p-4 grid grid-cols-[200px_1fr] gap-8 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col justify-between">
        <div className="h-[120px] w-full object-cover object-center rounded-lg shadow-md overflow-hidden">
          <img src={thumbnail} alt={`${name}-ตัวอย่าง`} className="transition-transform group-hover:scale-110" />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Image src={IconVerifiedSVG} alt="IconVerifiedSVG" />
          <h5 className="text-success">ลงทะเบียนที่พักแล้ว</h5>
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-primary underline-offset-4 group-hover:underline">{name}</h2>
          <p className="text-gray-500">{address}</p>
          <div className="flex items-end space-x-2">
            <h4>
              {convertNumberToString(priceStart)} - {convertNumberToString(priceEnd)}
            </h4>
            <p className="text-gray-500">บาท/เดือน</p>
          </div>
        </div>
        <p className="text-gray-500">ประกาศ: {convertDateFormat(timestamp)}</p>
        <p className="text-gray-500 flex place-self-end items-center space-x-1">
          <MdDirectionsRun className="text-xl" />
          <span>ห่างจากหน้ามหาลัย ~{calDistance(distance)}</span>
        </p>
      </div>
    </div>
  )
}

export default CardDorm
