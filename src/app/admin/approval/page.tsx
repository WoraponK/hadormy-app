'use client'
// Lib
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'

// Include in project
import { ManageApprovalSection } from '@/containers/admin-approval'
import { TDorm, TDormTable } from '@/lib/type'
import RoleBasedAccess from '@/components/common/RoleBasedAccess'
import { getDorms } from '@/collections/dormsCollection'
import { db } from '@/lib/firebase'

import { subscribeToDorms } from '@/collections/dormsCollection'

const AdminApproval = () => {
  const [dormData, setDormData] = useState<TDormTable[]>([])

  useEffect(() => {
    document.title = `การอนุมัติหอพัก - HaDormy`
  }, [])

  // useEffect(() => {
  //   const fetchDorm = async () => {
  //     try {
  //       const dorms = await getDorms()
  //       const filteredDorms = dorms.filter((dorm) => dorm.is_activated === false)

  //       const formattedDorms: TDormTable[] = filteredDorms.map((dorm) => ({
  //         id: dorm.id,
  //         name: dorm.name,
  //         createdBy: dorm.creator_name,
  //         phoneNumber: dorm.phoneNumber,
  //         updateAt: dorm.timestamp,
  //       }))
  //       setDormData(formattedDorms)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   fetchDorm()
  // }, [])

  useEffect(() => {
    const unsubscribe = subscribeToDorms((dorms) => {
      const filteredDorms = dorms.filter((dorm) => dorm.is_activated === false)

      const formattedDorms: TDormTable[] = filteredDorms.map((dorm) => ({
        id: dorm.id,
        name: dorm.name,
        createdBy: dorm.creator_name,
        phoneNumber: dorm.phoneNumber,
        updateAt: dorm.timestamp,
      }))
      setDormData(formattedDorms)
    })

    return () => unsubscribe()
  }, [])

  return (
    <RoleBasedAccess allowedRoles={['ADMIN']}>
      <div className="container mx-auto min-h-screen">
        <div className="space-y-8">
          <h1>การอนุมัติหอพัก</h1>
          <ManageApprovalSection data={dormData} />
        </div>
      </div>
    </RoleBasedAccess>
  )
}

export default AdminApproval
