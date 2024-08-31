// Lib
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import Image from 'next/image'

// Images
import { FaRegBell, FaBell } from 'react-icons/fa6'
import { EUserRole, TNotification } from '@/lib/type'
import { IoClose } from 'react-icons/io5'
import hadormyLogoSVG from '@/images/logos/hadormy-logo-mini-color.svg'

// Include in project
import { convertDateFormat } from '@/lib/others'
import FirebaseImage from '@/components/common/FirebaseImage'
import { updateNotification, deleteNotification } from '@/collections/notificationCollection'
import { getUserIdByDormId } from '@/collections/checkCollection'

type Props = {
  userId: string | number | null
  notifications: TNotification[]
}

const PopOverNotification: React.FC<Props> = ({ userId, notifications }) => {
  notifications.sort((a, b) => (new Date(b.updateAt) as any) - (new Date(a.updateAt) as any))

  const handleClick = async (userId: string, notiId: string) => {
    try {
      await updateNotification(userId, notiId, {
        is_seen: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = async (userId: string, notiId: string) => {
    try {
      await deleteNotification(userId, notiId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={'icon'} className="bg-transparent transition-colors hover:text-gray-300 shadow-none relative">
          <FaRegBell className="text-2xl" />
          {notifications.some((noti) => noti.is_seen === false) && (
            <div className="h-[15px] aspect-square bg-destructive absolute top-[2px] right-[2px] rounded-full animate-bounce" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden mt-3 space-y-2">
        <div className="flex items-center space-x-2 text-primary">
          <FaBell className="text-lg" />
          <h4>การแจ้งเตือน</h4>
        </div>
        <div className="overflow-auto h-full max-h-80 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((noti, index) => (
              <div
                key={index}
                className={`p-2 flex space-x-2 items-center rounded shadow-md relative transition-all ${
                  noti.is_seen ? 'bg-gray-200' : 'cursor-pointer hover:bg-gray-100'
                }`}
                onClick={() => (noti.is_seen ? undefined : handleClick(userId as string, noti.id as string))}
              >
                <Avatar>
                  {noti.role === EUserRole.Superuser ? (
                    <FirebaseImage
                      imagePath={noti.image}
                      alt={`${noti.title}-notification`}
                      className="object-cover object-center"
                    />
                  ) : (
                    noti.role === EUserRole.Admin && (
                      <Image
                        src={hadormyLogoSVG}
                        width={500}
                        height={300}
                        alt={`${noti.title}-notification`}
                        className="object-contain object-center"
                      />
                    )
                  )}
                </Avatar>
                <div className="space-y-1">
                  <h6>{noti.title}</h6>
                  {noti.description && <p className="line-clamp-2 text-xs">{noti.description}</p>}
                  <p className="text-gray-400 text-xs">{convertDateFormat(noti.updateAt)}</p>
                </div>
                {noti.is_seen && (
                  <IoClose
                    onClick={() => handleClose(userId as string, noti.id as string)}
                    className="cursor-pointer absolute top-2 right-2"
                  />
                )}
              </div>
            ))
          ) : (
            <div className="py-4">
              <p className="text-center">ไม่พบการแจ้งเตือน...</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOverNotification
