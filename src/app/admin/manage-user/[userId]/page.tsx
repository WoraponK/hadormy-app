'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageUserByIdSection } from '@/containers/admin-manage-user'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'

const AdminManageUserById = ({ params }: { params: { userId: string } }) => {
  useEffect(() => {
    document.title = `จัดการบัญชีผู้ใช้ - HaDormy`
  }, [])

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <div className="container mx-auto">
        <ManageUserByIdSection userId={params.userId} />
      </div>
    </RoleBasedAccess>
  )
}

export default AdminManageUserById
