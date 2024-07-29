'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageRoomSection } from '@/containers/owner-manage-room'
import { TRoom } from '@/lib/type'

const OwnerManageRoom = () => {
  useEffect(() => {
    document.title = `จัดการห้องพัก - HaDormy`
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="space-y-8">
        <h1>จัดการห้องพัก</h1>
        <ManageRoomSection data={mockupData} />
      </div>
    </div>
  )
}

export default OwnerManageRoom

const mockupData: TRoom[] = [
  {
    id: '1',
    name: '101',
    price: 3000,
    isAvailable: true,
  },
  {
    id: '2',
    name: '102',
    price: 3000,
    isAvailable: false,
  },
]
