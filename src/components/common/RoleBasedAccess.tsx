'use client'
// Lib
import { useAuth } from '@/context/authContext'

// Include in project
import { LoadingSpinner } from '../shared'
import { getUserById } from '@/collections/usersCollection'
import { useEffect, useState } from 'react'
import { TUser } from '@/lib/type'
import NotFound from '@/app/not-found'

interface RoleBasedAccessProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<TUser | null>(null)
  const [isUserDataLoading, setIsUserDataLoading] = useState(true)

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
      } finally {
        setIsUserDataLoading(false)
      }
    }

    fetchUser()
  }, [user])

  const userRole = userData?.role || ''

  if (loading || isUserDataLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <LoadingSpinner className="text-primary" />
      </div>
    )
  }

  if (!allowedRoles.includes(userRole)) {
    return <NotFound />
  }

  return <>{children}</>
}

export default RoleBasedAccess
