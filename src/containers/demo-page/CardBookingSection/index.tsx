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
        The <span className="text-primary">CardBooking</span> have no props.
      </h6>
      <div className="bg-background rounded-lg p-4 flex flex-wrap gap-6 justify-center">
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isUnavailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isUnavailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isUnavailable />
        <CardBooking name="Room 39" price={3000} />
        <CardBooking name="Room 39" price={3000} isUnavailable />
      </div>
    </div>
  )
}

export default CardBookingSection
