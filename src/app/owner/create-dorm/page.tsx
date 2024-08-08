'use client'
// Lib
import React, { useEffect } from 'react'

// Include in project
import { CreateDormSection } from '@/containers/owner-create-dorm'

const OwnerCreateDorm = () => {
  useEffect(() => {
    document.title = `เพิ่มหอพัก - HaDormy`
  }, [])
  return (
    <div className="container mx-auto">
      <CreateDormSection />
    </div>
  )
}

export default OwnerCreateDorm
