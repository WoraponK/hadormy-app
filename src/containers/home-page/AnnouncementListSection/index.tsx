// Lib
import React from 'react'
import Image from 'next/image'

// Images
import IconMegaphoneBlackSVG from '@/images/common/icon-megaphone-black.svg'

// Include in project
import { CardAnnouncement } from '@/components/shared'

const AnnouncementListSection: React.FC = () => {
  return (
    <div className="bg-secondary p-4 rounded-lg flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3>ประกาศ</h3>
        <Image src={IconMegaphoneBlackSVG} alt="IconMegaphoneBlackSVG" />
      </div>
      <div className="flex flex-col gap-2">
        <CardAnnouncement
          author="worapon"
          title="ไฟดับ"
          description="สวัสดีครับ"
          role="SUPERUSER"
          timestamp="2024-06-27T16:05Z"
          thumbnail="https://wamu.org/wp-content/uploads/2024/05/spongebobsquarepants_key_art_wide-429bee20400a15a76c1a617985c74db87bd09d98.jpg"
        />
        <CardAnnouncement
          author="worapon"
          title="ไฟดับ"
          description="สวัสดีครับ"
          role="ADMIN"
          timestamp="2024-06-27T16:05Z"
        />
        <CardAnnouncement
          author="worapon"
          title="ไฟดับ"
          description="สวัสดีครับ"
          role="SUPERUSER"
          timestamp="2024-06-27T16:05Z"
        />
        <CardAnnouncement
          author="worapon"
          title="ไฟดับ"
          description="สวัสดีครับ"
          role="SUPERUSER"
          timestamp="2024-06-27T16:05Z"
        />
        <CardAnnouncement
          author="worapon"
          title="ไฟดับ"
          description="สวัสดีครับ"
          role="SUPERUSER"
          timestamp="2024-06-27T16:05Z"
        />
      </div>
    </div>
  )
}

export default AnnouncementListSection
