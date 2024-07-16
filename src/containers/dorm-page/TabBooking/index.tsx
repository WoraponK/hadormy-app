'use client'
// Lib
import React from 'react'

// Include in project
import { TRoom } from '@/lib/type'
import { CardBooking } from '@/components/shared'

type Props = {
  rooms: TRoom[]
}

const TabBooking: React.FC<Props> = ({ rooms }) => {
  return (
    <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1">
      {rooms.map((ele) => (
        <CardBooking key={ele.id} name={ele.name} price={ele.price} isAvailable={ele.isAvailable} />
      ))}
    </div>
  )
}

export default TabBooking
