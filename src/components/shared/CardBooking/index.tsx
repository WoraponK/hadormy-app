'use client'

// Lib
import React, { useEffect, useState } from 'react'
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
import { useToast } from '@/components/ui/use-toast'
import { storage } from '@/lib/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'

// Images
import { IoCheckmarkCircle, IoCheckmarkCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'

// Include in project
import { useAuth } from '@/context/authContext'
import { convertNumberToString } from '@/lib/others'
import { Button } from '@/components/ui/button'
import { addRoomBooking } from '@/collections/roomBookingCollection'
import { getUserById } from '@/collections/usersCollection'
import { Timestamp } from 'firebase/firestore'
import { getUserIdByDormId } from '@/collections/checkCollection'
import { addNotification } from '@/collections/notificationCollection'

type Props = {
  dormId: string
  roomId: string
  name: string
  price: number
  isAvailable?: boolean
  isBooking?: boolean
  disabled?: boolean
}

const CardBooking: React.FC<Props> = ({ dormId, roomId, name, price, isAvailable, isBooking, disabled }) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('')
  const [userName, setUserName] = useState<string>('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return
        const data = await getUserById(user?.uid)
        if (!data) return
        setUserPhoneNumber(data.phone)
        setUserName(data.name)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [user])

  const handleSubmit = async () => {
    try {
      if (!user) return

      await addRoomBooking(dormId, {
        dorm_id: dormId,
        room_id: roomId,
        room_name: name,
        user_id: user?.uid,
        user_name: userName,
        phone_number: userPhoneNumber,
        created_at: Timestamp.now(),
      })
        .then(() => {
          toast({
            variant: 'success',
            icon: <IoCheckmarkCircle className="text-forground" />,
            title: 'ทำการจองห้องพักสำเร็จ',
          })
        })
        .catch(() => {
          throw new Error('Error')
        })

      const ownerId = await getUserIdByDormId(dormId)

      if (!ownerId) return

      const storagePath = `dorms/${ownerId}/`
      const imagesRef = ref(storage, storagePath)

      const newNotification = {
        title: `${userName} ได้ทำการจองห้องพัก!`,
        description: `ห้อง ${name}`,
        is_seen: false,
        updateAt: Timestamp.now(),
        image: '',
        link: '/owner/approval',
      }

      try {
        const imageList = await listAll(imagesRef)
        if (imageList.items.length > 0) {
          const firstImageRef = imageList.items[0]
          const firstImageURL = await getDownloadURL(firstImageRef)
          newNotification.image = firstImageURL
        } else {
          console.warn('No images found in storage.')
        }
      } catch (error) {
        console.error(error)
      }

      await addNotification(ownerId, newNotification)
    } catch (error) {
      console.error(error)
    }
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
            <Button size={'sm'} className="w-fit" disabled={!isAvailable || isBooking || !user}>
              {isBooking ? 'จองแล้ว' : 'จองห้องนี้'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="space-y-2">
            <AlertDialogHeader className="space-y-4">
              <AlertDialogTitle asChild>
                <div className="flex flex-col items-center gap-4">
                  {disabled ? (
                    <>
                      <IoCloseCircleOutline className="text-destructive text-6xl" />
                      <h3 className="text-center text-destructive">ไม่สามารถทำการจองห้องอื่นอีกได้สำหรับหอพักนี้</h3>
                    </>
                  ) : (
                    <>
                      <IoCheckmarkCircleOutline className="text-6xl text-primary" />
                      <h3 className="text-center text-primary">ต้องการจองห้องนี้ใช่หรือไม่?</h3>
                    </>
                  )}
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                {disabled ? 'เนื่องจากคุณได้ทำการจองอีกห้องไว้แล้ว' : 'ระบบจะทำการส่งคำขอไปยังเจ้าของหอพัก'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
              {!disabled && <AlertDialogAction onClick={handleSubmit}>ยืนยัน</AlertDialogAction>}
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
