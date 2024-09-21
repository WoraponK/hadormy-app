'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Images
import { IoIosWarning } from 'react-icons/io'

// Include in project
import { TRoom } from '@/lib/type'
import { CardBooking } from '@/components/shared'
import { useAuth } from '@/context/authContext'
import { subscribeToRoomIdByUserId } from '@/collections/roomBookingCollection'

type Props = {
  dormId: string
  rooms: TRoom[]
  isCreator: boolean
  isSuperuser: boolean
  isAdmin: boolean | null
}

const TabBooking: React.FC<Props> = ({ dormId, rooms, isCreator, isSuperuser, isAdmin }) => {
  const { user } = useAuth()

  const [roomId, setRoomId] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    const unsubscribeCheckRoomBooking = subscribeToRoomIdByUserId(dormId, user.uid, (roomId) => {
      setRoomId(roomId)
    })

    return () => unsubscribeCheckRoomBooking()
  }, [user, dormId])

  return (
    <div className="space-y-8">
      {!user || isSuperuser || isAdmin ? (
        <div className="flex justify-center items-center">
          <div className="border-2 border-primary py-2 px-4 w-fit rounded-full flex items-center justify-center space-x-2 text-primary">
            <IoIosWarning />
            <p className="font-semibold">
              {!user && 'กรุณาเข้าสู่ระบบเพื่อทำการจองห้องพัก'}
              {isSuperuser && 'เนื่องจากคุณมีบทบาทเป็นเจ้าของหอพัก จึงไม่สามารถทำการจองห้องพักได้'}
              {isAdmin && 'เนื่องจากคุณเป็นผู้ดูแลระบบ จึงไม่สามารถทำการจองห้องพักได้'}
            </p>
          </div>
        </div>
      ) : null}
      {rooms.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1">
          {rooms.map((ele) => (
            <CardBooking
              key={ele.id}
              dormId={dormId}
              roomId={ele.id as string}
              name={ele.name}
              price={ele.price}
              isAvailable={ele.isAvailable}
              isBooking={ele.id === roomId}
              isAdmin={isAdmin as boolean}
              isCreator={isCreator}
              isSuperuser={isSuperuser}
              disabled={roomId !== null && ele.id !== roomId}
            />
          ))}
        </div>
      ) : (
        <div className="w-full">
          <p className="text-center">ไม่พบข้อมูลห้องพัก...</p>
        </div>
      )}
    </div>
  )
}

export default TabBooking
