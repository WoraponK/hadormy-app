'use client'
// Lib
import React, { useEffect, useState } from 'react'

// Include in project
import { ManageDormSection } from '@/containers/owner-manage-dorm'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { useAuth } from '@/context/authContext'
import NotFound from '@/app/not-found'
import { getDormById } from '@/collections/dormsCollection'
import { TDorm } from '@/lib/type'

const OwnerManageDorm = ({ params }: { params: { dormId: string } }) => {
  const { user } = useAuth()
  const [dormId, setDormId] = useState<string | null>(null)
  const [dormData, setDormData] = useState<TDorm | null>(null)

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

  useEffect(() => {
    const fetchDorm = async () => {
      try {
        if (!dormId) return
        const data = await getDormById(dormId)
        setDormData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchDorm()
  }, [dormId])

  if (params.dormId === dormId) {
    return (
      <RoleBasedAccess allowedRoles={['SUPERUSER']}>
        <div className="container mx-auto">
          <ManageDormSection dormId={dormId} dormData={dormData} />
        </div>
      </RoleBasedAccess>
    )
  } else {
    return <NotFound />
  }
}

export default OwnerManageDorm
