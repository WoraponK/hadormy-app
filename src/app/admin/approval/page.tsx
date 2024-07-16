'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageApprovalSection } from '@/containers/admin-approval'
import { TDormTable } from '@/lib/type'

const AdminApproval = () => {
  useEffect(() => {
    document.title = `การอนุมัติหอพัก - HaDormy`
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <div className="space-y-8">
        <h1>การอนุมัติหอพัก</h1>
        <ManageApprovalSection data={mockupData} />
      </div>
    </div>
  )
}

export default AdminApproval

const mockupData: TDormTable[] = [
  {
    id: '1',
    name: 'Apartment',
    createdBy: 'Worapon Klabsri',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '2',
    name: 'Apartment 2',
    createdBy: 'Worapon Klabsri',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
  {
    id: '3',
    name: 'Apartment 3',
    createdBy: 'Worapon Klabsri',
    phoneNumber: '0630913505',
    updateAt: '2024-07-15T12:26:19Z',
  },
]
