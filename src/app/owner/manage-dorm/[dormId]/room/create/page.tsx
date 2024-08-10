'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageRoomCreateSection } from '@/containers/owner-manage-room'

const OwnerManageRoomCreate = () => {
  useEffect(() => {
    document.title = `เพิ่มห้องพัก - HaDormy`
  }, [])
  return (
    <div className="container mx-auto">
      <ManageRoomCreateSection />
    </div>
  )
}

export default OwnerManageRoomCreate
