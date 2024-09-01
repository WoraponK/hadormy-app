'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { ManageApprovalSection } from '@/containers/owner-approval'
import { TRoomApproveTable } from '@/lib/type'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { subscribeToRoomBookings } from '@/collections/roomBookingCollection'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { useAuth } from '@/context/authContext'

const OwnerApproval = () => {
  const { user } = useAuth()
  const [dormId, setDormId] = useState<string | null>(null)
  const [approvals, setApprovals] = useState<TRoomApproveTable[]>([])

  useEffect(() => {
    document.title = `การอนุมัติผู้เช่าหอพัก - HaDormy`

    const fetchDormId = async () => {
      try {
        if (!user) return
        const data = await getDormIdByUserId(user?.uid)
        setDormId(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDormId()
  }, [user])

  useEffect(() => {
    if (!dormId) return
    const unsubscribeRoomBooking = subscribeToRoomBookings(dormId, (roomBooking) => {
      const formattedApprovals: TRoomApproveTable[] = roomBooking.map((data) => ({
        id: data.id,
        dormId: data.dorm_id,
        username: data.user_name,
        userId: data.user_id,
        phoneNumber: data.phone_number,
        room: data.room_name,
        roomId: data.room_id,
        updateAt: data.created_at,
      }))

      setApprovals(formattedApprovals)
    })

    return () => unsubscribeRoomBooking()
  }, [dormId])

  return (
    <RoleBasedAccess allowedRoles={['SUPERUSER']}>
      <div className="container mx-auto min-h-screen">
        <div className="space-y-8">
          <h1>การอนุมัติผู้เช่าหอพัก</h1>
          <ManageApprovalSection data={approvals} />
        </div>
      </div>
    </RoleBasedAccess>
  )
}

export default OwnerApproval
