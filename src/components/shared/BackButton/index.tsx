'use client'
// Lib
import React from 'react'
import { useRouter } from 'next/navigation'

// Images
import { IoChevronBack } from 'react-icons/io5'

// Include in project

const BackButton: React.FC = () => {
  const router = useRouter()

  return (
    <div className="cursor-pointer text-gray-400 transition-all hover:opacity-50" onClick={() => router.back()}>
      <h5 className="flex gap-2 items-center">
        <IoChevronBack />
        <span>กลับ</span>
      </h5>
    </div>
  )
}

export default BackButton
