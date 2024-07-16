'use client'
// Lib
import React, { useEffect } from 'react'

// Images

// Include in project
import { TUserTable } from '@/lib/type'
import { ManageUserSection } from '@/containers/admin-manage-user'

const AdminManageUser = () => {
  useEffect(() => {
    document.title = `รายการบัญชีผู้ใช้ - HaDormy`
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="space-y-8">
        <h1>รายการบัญชีผู้ใช้</h1>
        <ManageUserSection data={mockupData} />
      </div>
    </div>
  )
}

export default AdminManageUser

const mockupData: TUserTable[] = [
  {
    id: '1',
    name: 'Worapon Klabsri',
    email: 'worapon.klabsri@gmail.com',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '0123456789',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'janeteka@example.com',
    phoneNumber: '0123456789',
    updateAt: '2024-07-13T12:26:19Z',
  },
]
