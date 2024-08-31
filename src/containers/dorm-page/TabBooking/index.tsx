'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { TRoom } from '@/lib/type'
import { CardBooking } from '@/components/shared'
import { useAuth } from '@/context/authContext'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { getUserById } from '@/collections/usersCollection'

type Props = {
  dormId: string
  rooms: TRoom[]
}

const TabBooking: React.FC<Props> = ({ dormId, rooms }) => {
  const { user } = useAuth()
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)

  useEffect(() => {
    const fetchCheckDorm = async () => {
      try {
        if (!user) return
        const checkDormId = await getDormIdByUserId(user.uid)
        setIsCreator(checkDormId === dormId)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchCheckAdmin = async () => {
      try {
        if (!user) return
        const userData = await getUserById(user.uid)
        if (!userData) return
        setIsAdmin(userData.role === 'ADMIN')
      } catch (error) {
        console.error(error)
      }
    }

    fetchCheckDorm()
    fetchCheckAdmin()
  }, [])

  if (isCreator) {
    return (
      <div className="w-full grid place-items-center">
        <p>เนื่องจากคุณเป็นเจ้าของหอพักนี้ จึงไม่สามารถทำการจองห้องพักได้</p>
      </div>
    )
  }

  if (isAdmin) {
    return (
      <div className="w-full grid place-items-center">
        <p>เนื่องจากคุณเป็นผู้ดูแลระบบ จึงไม่สามารถทำการจองห้องพักได้</p>
      </div>
    )
  }

  return (
    <div>
      {rooms.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1">
          {rooms.map((ele) => (
            <CardBooking key={ele.id} name={ele.name} price={ele.price} isAvailable={ele.isAvailable} />
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
