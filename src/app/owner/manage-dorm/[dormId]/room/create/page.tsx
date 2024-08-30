'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageRoomCreateSection } from '@/containers/owner-manage-room'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'

const OwnerManageRoomCreate = () => {
  useEffect(() => {
    document.title = `เพิ่มห้องพัก - HaDormy`
  }, [])
  return (
    <RoleBasedAccess allowedRoles={['SUPERUSER']}>
      <div className="container mx-auto">
        <ManageRoomCreateSection />
      </div>
    </RoleBasedAccess>
  )
}

export default OwnerManageRoomCreate
