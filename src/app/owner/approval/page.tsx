'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageApprovalSection } from '@/containers/owner-approval'
import { TRoomApproveTable } from '@/lib/type'

const OwnerApproval = () => {
  useEffect(() => {
    document.title = `การอนุมัติผู้เช่าหอพัก - HaDormy`
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="space-y-8">
        <h1>การอนุมัติผู้เช่าหอพัก</h1>
        <ManageApprovalSection data={mockupData} />
      </div>
    </div>
  )
}

export default OwnerApproval

const mockupData: TRoomApproveTable[] = [
  {
    id: '1',
    name: 'John Doe',
    room: '101',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    room: '102',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '3',
    name: 'Lebron James',
    room: '103',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
]
