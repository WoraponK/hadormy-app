'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageUserByIdSection } from '@/containers/admin-manage-user'

const AdminManageUserById = () => {
  useEffect(() => {
    document.title = `จัดการบัญชีผู้ใช้ - HaDormy`
  }, [])
  
  return (
    <div className="container mx-auto">
      <ManageUserByIdSection />
    </div>
  )
}

export default AdminManageUserById
