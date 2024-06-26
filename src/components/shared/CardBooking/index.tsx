// Lib
import React from 'react'

// Include in project
import { convertNumberToString } from '@/lib/others'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Props = {
  name: string
  price: number
  isUnavailable?: boolean
}

const CardBooking: React.FC<Props> = ({ name, price, isUnavailable }) => {
  return (
    <div className="max-w-[300px] w-full h-[80px] shadow-md rounded-lg grid grid-cols-[55%_45%] overflow-hidden">
      <div className="grid grid-rows-[25px_1fr]">
        <div className="bg-secondary px-2 flex items-center">
          <p className="line-clamp-1 font-semibold">{name}</p>
        </div>
        <div className="flex items-center px-2">
          <p className="text-sm">ราคา {convertNumberToString(price)} บาท/เดือน</p>
        </div>
      </div>
      <div className="p-2 flex flex-col items-end justify-between">
        <Button
          size={'sm'}
          className="w-fit"
          disabled={isUnavailable ? false : true}
          onClick={() => console.log('Book!')}
        >
          จองห้องนี้
        </Button>
        <p className="text-sm text-end font-semibold">
          สถานะ:{' '}
          {isUnavailable ? <span className="text-success">ว่าง</span> : <span className="text-alert">ไม่ว่าง</span>}
        </p>
      </div>
    </div>
  )
}

export default CardBooking
