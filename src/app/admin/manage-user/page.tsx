'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Images

// Include in project
import { EUserRole, TUserRole, TUserTable } from '@/lib/type'
import { ManageUserSection } from '@/containers/admin-manage-user'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { getUsers, listenToUsers } from '@/collections/usersCollection'

const AdminManageUser = () => {
  const [userData, setUserData] = useState<TUserTable[]>([])

  useEffect(() => {
    document.title = `รายการบัญชีผู้ใช้ - HaDormy`
  }, [])

  useEffect(() => {
    const unsubscribe = listenToUsers((data) => {
      try {
        const formattedUsers: TUserTable[] = data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phone,
          created_at: user.created_at as string,
          role: user.role as EUserRole,
        }))

        setUserData(formattedUsers)
      } catch (error) {
        console.error(error)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <div className="container mx-auto min-h-screen">
        <div className="space-y-8">
          <h1>รายการบัญชีผู้ใช้</h1>
          <ManageUserSection data={userData} />
        </div>
      </div>
    </RoleBasedAccess>
  )
}

export default AdminManageUser
