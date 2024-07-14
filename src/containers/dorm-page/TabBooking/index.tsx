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
    <div className="flex flex-wrap gap-4 justify-center">
      {rooms.map((ele, index) => (
        <CardBooking key={ele.id} name={ele.name} price={ele.price} isAvailable={ele.isAvailable} />
      ))}
    </div>
  )
}

export default TabBooking
