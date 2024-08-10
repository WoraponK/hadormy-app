'use client'
// Lib
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

// Include in project
import { LoadingSpinner } from '../shared'
import { getUserById } from '@/collections/usersCollection'
import { useEffect, useState } from 'react'
import { TUser } from '@/lib/type'

interface RoleBasedAccessProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ allowedRoles, children }) => {
  const router = useRouter()
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<TUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const data = await getUserById(user.uid)
          setUserData(data)
        } else {
          setUserData(null)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [user])

  const userRole = userData?.role || ''

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!allowedRoles.includes(userRole || '')) {
    router.push('/')
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center space-y-4">
          <h1 className="text-primary">ไม่สามารถเข้าใช้งานหน้านี้ได้</h1>
          <h3>กำลังกลับไปยังหน้าหลัก...</h3>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default RoleBasedAccess
