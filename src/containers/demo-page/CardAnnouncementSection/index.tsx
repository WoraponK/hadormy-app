'use client'

// Lib
import React from 'react'

// Include in project
import { CardAnnouncement } from '@/components/shared'

const CardAnnouncementSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2>CardAnnouncement</h2>
      <h6>
        The <span className="text-primary">CardAnnouncement</span> have no props.
      </h6>
      <div className="bg-background rounded-lg flex justify-center items-center p-4">
        <CardAnnouncement />
      </div>
    </div>
  )
}

export default CardAnnouncementSection
