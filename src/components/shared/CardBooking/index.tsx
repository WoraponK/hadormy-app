// Lib
import React from 'react'

// Include in project
import { convertNumberToString } from '@/lib/others'
import { Button } from '@/components/ui/button'

type Props = {
  name: string
  price: number
  isAvailable?: boolean
}

const CardBooking: React.FC<Props> = ({ name, price, isAvailable }) => {
  return (
    <div className="bg-background max-w-[300px] w-full h-[80px] shadow-md rounded-sm grid grid-cols-[55%_45%] overflow-hidden">
      <div className="grid grid-rows-[30px_1fr]">
        <div className="bg-secondary px-2 flex items-center rounded-br-lg rounded-tr-lg">
          <p className="line-clamp-1 font-semibold">{name}</p>
        </div>
        <div className="flex items-center px-2">
          <p className="text-sm">
            <span className="max-md:hidden">ราคา</span> {convertNumberToString(price)} บาท/เดือน
          </p>
        </div>
      </div>
      <div className="py-2 px-2 flex flex-col items-end justify-between">
        <Button size={'sm'} className="w-fit" disabled={isAvailable} onClick={() => console.log('Book!')}>
          จองห้องนี้
        </Button>
        <p className="text-sm text-end font-semibold">
          สถานะ:{' '}
          {isAvailable ? <span className="text-alert">ไม่ว่าง</span> : <span className="text-success">ว่าง</span>}
        </p>
      </div>
    </div>
  )
}

export default CardBooking
