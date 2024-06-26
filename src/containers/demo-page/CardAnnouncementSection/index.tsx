'use client'

// Lib
import React from 'react'

// Include in project
import { CardAnnouncement } from '@/components/shared'

const CardAnnouncementSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">CardAnnouncement</h2>
      <h6>
        The <span className="text-primary">CardAnnouncement</span> have props title, description, thumbnail, role, and
        timestamp.
      </h6>
      <div className="bg-background rounded-lg flex flex-wrap justify-center items-center p-4 gap-4">
        <CardAnnouncement
          title="ปิดปรับปรุง"
          author="แอดมิน"
          description="ประกาศปิดปรับปรุงเว็บไซต์ในช่วงเวลา 15:00น. - 16:30น."
          timestamp="2024-06-23T16:04:18Z"
          role="SUPERUSER"
        />
        <CardAnnouncement
          title="หอสีเหลืองไฟดับ"
          author="หอสีเหลือง"
          description="วันนี้ไฟจะดับช่วงเวลา 15:00น. - 16:30น."
          timestamp="2024-06-23T16:04:18Z"
          role="ADMIN"
        />
      </div>
    </div>
  )
}

export default CardAnnouncementSection
