'use client'

// Lib
import React from 'react'

// Include in project
import { CardBooking } from '@/components/shared'

const CardBookingSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">CardBooking</h2>
      <h6>
        The <span className="text-primary">CardBooking</span> have props name, price, isUnavailable.
      </h6>
      <div className="bg-background rounded-lg p-4 grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1 justify-center">
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isAvailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isAvailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isAvailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isAvailable />
      </div>
    </div>
  )
}

export default CardBookingSection
