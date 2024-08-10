'use client'
import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'

import { LoadingSpinner } from '../shared'

interface RoleBasedAccessProps {
  allowedRoles: string[]
  children: React.ReactNode
}

const RoleBasedAccess: React.FC<RoleBasedAccessProps> = ({ allowedRoles, children }) => {
  const router = useRouter()
  const { role, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!allowedRoles.includes(role || '')) {
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
