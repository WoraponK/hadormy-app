// Lib
import React from 'react'
import Image from 'next/image'

// Images
import IconMegaphoneBlackSVG from '@/images/common/icon-megaphone-black.svg'

// Include in project
import { CardAnnouncement } from '@/components/shared'
import { TCardAnnounce, TUserRole } from '@/lib/type'

type Props = {
  cardList: TCardAnnounce[]
}

const AnnouncementListSection: React.FC<Props> = ({ cardList }) => {
  return (
    <div className="space-y-2 max-lg:space-y-0">
      <div className="h-[36px] max-lg:hidden" />
      <div className="bg-secondary p-4 rounded-lg flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <h3>ประกาศ</h3>
          <Image src={IconMegaphoneBlackSVG} alt="IconMegaphoneBlackSVG" />
        </div>
        <div className="flex flex-col gap-2 max-lg:flex-row max-lg:overflow-x-auto max-lg:pb-4">
          {cardList.map((card) => (
            <CardAnnouncement
              key={card?.id}
              author={card?.author}
              title={card?.title}
              description={card?.description}
              role={card?.role as TUserRole}
              timestamp={card?.timestamp}
              thumbnail={card?.thumbnail}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementListSection
