'use client'
// Lib
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Include in project
import { CreateDormSection } from '@/containers/owner-create-dorm'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { useAuth } from '@/context/authContext'
import { getUserById } from '@/collections/usersCollection'

const OwnerCreateDorm = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    document.title = `เพิ่มหอพัก - HaDormy`
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return

      try {
        const data = await getUserById(user.uid)
        if (data?.owner_dorm) {
          router.replace('/')
          return
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [user, router])

  return (
    <RoleBasedAccess allowedRoles={['SUPERUSER']}>
      <div className="container mx-auto">
        <CreateDormSection />
      </div>
    </RoleBasedAccess>
  )
}

export default OwnerCreateDorm
