'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageUserByIdSection } from '@/containers/admin-manage-user'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'

const AdminManageUserById = () => {
  useEffect(() => {
    document.title = `จัดการบัญชีผู้ใช้ - HaDormy`
  }, [])

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <div className="container mx-auto">
        <ManageUserByIdSection />
      </div>
    </RoleBasedAccess>
  )
}

export default AdminManageUserById
