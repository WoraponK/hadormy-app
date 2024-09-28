'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { ManageRoomSection } from '@/containers/owner-manage-room'
import { TRoom } from '@/lib/type'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { subscribeToRooms } from '@/collections/roomsCollection'
import { useAuth } from '@/context/authContext'
import { getDormIdByUserId } from '@/collections/checkCollection'
import NotFound from '@/app/not-found'

const OwnerManageRoom = ({ params }: { params: { dormId: string } }) => {
  const { user } = useAuth()
  const [dormId, setDormId] = useState<string | null>(null)
  const [roomList, setRoomList] = useState<TRoom[]>([])

  useEffect(() => {
    document.title = `จัดการห้องพัก - HaDormy`

    const unsubscribeRooms = subscribeToRooms(params.dormId, (rooms) => {
      const formattedRooms: TRoom[] = rooms.map((room) => ({
        id: room.id,
        name: room.name,
        price: room.price,
        isAvailable: room.isAvailable,
        userID: room.user_id,
        userName: room.username,
      }))

      setRoomList(formattedRooms)
    })

    return () => {
      unsubscribeRooms()
    }
  }, [params.dormId])

  useEffect(() => {
    const fetchDormId = async () => {
      try {
        if (user) {
          const data = await getDormIdByUserId(user.uid)
          setDormId(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchDormId()
  }, [user])

  if (params.dormId === dormId) {
    return (
      <RoleBasedAccess allowedRoles={['SUPERUSER']}>
        <div className="container mx-auto min-h-screen">
          <div className="space-y-8">
            <h1>จัดการห้องพัก</h1>
            <ManageRoomSection dormId={params.dormId} data={roomList} />
          </div>
        </div>
      </RoleBasedAccess>
    )
  } else {
    return <NotFound />
  }
}

export default OwnerManageRoom
