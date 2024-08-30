'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageRoomIdSection } from '@/containers/owner-manage-room'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'

const OwnerManageRoomById = () => {
  useEffect(() => {
    document.title = `แก้ไขห้องพัก - HaDormy`
  }, [])
  return (
    <RoleBasedAccess allowedRoles={['SUPERUSER']}>
      <div className="container mx-auto">
        <ManageRoomIdSection />
      </div>
    </RoleBasedAccess>
  )
}

export default OwnerManageRoomById
