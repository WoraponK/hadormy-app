'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageRoomIdSection } from '@/containers/owner-manage-room'

const OwnerManageRoomById = () => {
  useEffect(() => {
    document.title = `แก้ไขห้องพัก - HaDormy`
  }, [])
  return (
    <div className="container mx-auto">
      <ManageRoomIdSection />
    </div>
  )
}

export default OwnerManageRoomById
