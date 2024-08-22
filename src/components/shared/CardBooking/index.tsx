// Lib
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// Images
import { IoCheckmarkCircleOutline } from 'react-icons/io5'

// Include in project
import { convertNumberToString } from '@/lib/others'
import { Button } from '@/components/ui/button'

type Props = {
  name: string
  price: number
  isAvailable?: boolean
}

const CardBooking: React.FC<Props> = ({ name, price, isAvailable }) => {
  const handleSubmit = () => {
    console.log('Book!')
  }

  return (
    <div className="bg-background w-full h-[80px] shadow-md rounded-sm grid grid-cols-[55%_45%] overflow-hidden">
      <div className="grid grid-rows-[30px_1fr]">
        <div className="bg-secondary px-2 flex items-center rounded-br-lg rounded-tr-lg">
          <p className="line-clamp-1 font-semibold">{name}</p>
        </div>
        <div className="flex items-center px-2">
          <p className="text-sm">{convertNumberToString(price)} บาท/เดือน</p>
        </div>
      </div>
      <div className="py-2 px-2 flex flex-col items-end justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size={'sm'} className="w-fit" disabled={!isAvailable}>
              จองห้องนี้
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="space-y-2">
            <AlertDialogHeader className="space-y-4">
              <AlertDialogTitle asChild>
                <div className="flex flex-col items-center gap-4 text-primary">
                  <IoCheckmarkCircleOutline className="text-primary text-6xl" />
                  <h3 className="text-center">ต้องการจองห้องนี้ใช่หรือไม่?</h3>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                ระบบจะทำการส่งคำขอไปยังเจ้าของหอพัก
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>ยืนยัน</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-sm text-end font-semibold">
          สถานะ:{' '}
          {!isAvailable ? <span className="text-alert">ไม่ว่าง</span> : <span className="text-success">ว่าง</span>}
        </p>
      </div>
    </div>
  )
}

export default CardBooking
