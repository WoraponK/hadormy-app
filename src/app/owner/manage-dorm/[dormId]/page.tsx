'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { ManageDormSection } from '@/containers/owner-manage-dorm'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { useAuth } from '@/context/authContext'
import NotFound from '@/app/not-found'

const OwnerManageDorm = ({ params }: { params: { dormId: string } }) => {
  const { user } = useAuth()
  const [dormId, setDormId] = useState<string | null>(null)

  useEffect(() => {
    document.title = `แก้ไขหอพัก - HaDormy`
  }, [])

  useEffect(() => {
    const fetchDormId = async () => {
      try {
        if (user) {
          const data = await getDormIdByUserId(user.uid)
          setDormId(data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchDormId()
  }, [user])

  if (params.dormId === dormId) {
    return (
      <RoleBasedAccess allowedRoles={['SUPERUSER']}>
        <div className="container mx-auto">
          <ManageDormSection />
        </div>
      </RoleBasedAccess>
    )
  } else {
    return <NotFound />
  }
}

export default OwnerManageDorm
