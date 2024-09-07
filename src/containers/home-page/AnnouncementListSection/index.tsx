// Lib
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

// Images
import IconMegaphoneBlackSVG from '@/images/common/icon-megaphone-black.svg'

// Include in project
import { CardAnnouncement } from '@/components/shared'
import { TCardAnnounce, TUserRole } from '@/lib/type'

type Props = {
  cardList: TCardAnnounce[]
  onLoadMore: () => void
  currentLimit: number
}

const AnnouncementListSection: React.FC<Props> = ({ cardList, onLoadMore, currentLimit }) => {
  cardList.sort((a, b) => (new Date(b.timestamp) as any) - (new Date(a.timestamp) as any))

  return (
    <div className="space-y-2 max-lg:space-y-0">
      <div className="h-[36px] max-lg:hidden" />
      <div className="bg-secondary p-4 rounded-lg flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <h3>ประกาศ</h3>
          <Image src={IconMegaphoneBlackSVG} alt="IconMegaphoneBlackSVG" />
        </div>
        <div className="flex flex-col gap-2 max-lg:flex-row max-lg:overflow-x-auto max-lg:pb-4">
          {cardList.length > 0 ? (
            <>
              {cardList.map((card) => (
                <CardAnnouncement
                  key={card?.id}
                  author={card?.author}
                  title={card?.title}
                  description={card?.description}
                  role={card?.role as TUserRole}
                  timestamp={card.timestamp}
                  thumbnail={card?.thumbnail}
                  user_id={card?.user_id}
                />
              ))}
              {cardList.length >= currentLimit && (
                <div>
                  <Button onClick={onLoadMore} className="w-full max-lg:h-full max-lg:w-fit max-lg:px-2">
                    โหลดเพิ่ม
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="w-full flex justify-center py-4">
              <p>ไม่พบข้อมูลประกาศ...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AnnouncementListSection
