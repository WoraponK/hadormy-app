'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { ManageDormSection } from '@/containers/owner-manage-dorm'

const OwnerManageDorm = () => {
  useEffect(() => {
    document.title = `แก้ไขหอพัก - HaDormy`
  }, [])
  return (
    <div className="container mx-auto">
      <ManageDormSection />
    </div>
  )
}

export default OwnerManageDorm
