'use client'

// Lib
import React from 'react'
import Image from 'next/image'
import { useAuth } from '@/context/authContext'

// Images
import { FaEarthAsia } from 'react-icons/fa6'
import { IoIosWarning } from 'react-icons/io'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { imagePlaceholder } from '@/lib/others'
import HadormyLogoSVG from '@/images/logos/hadormy-logo-mini-yellow.svg'

// Include in project
import { TUserRole } from '@/lib/type'
import { convertDateFormat } from '@/lib/others'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import FirebaseImage from '@/components/common/FirebaseImage'
import { deleteAnnouce } from '@/collections/announcementCollection'

import TooltipMain from '@/components/ui/tooltip-main'

type Props = {
  title: string
  description: string
  thumbnail?: string
  role: TUserRole
  timestamp: string
  author: string
  user_id: string
}

const CardAnnouncement: React.FC<Props> = ({
  title,
  description,
  thumbnail = imagePlaceholder,
  role,
  timestamp,
  author,
  user_id,
}) => {
  const { user } = useAuth()

  const handleDelete = async (announceId: string) => {
    try {
      await deleteAnnouce(announceId)
    } catch (error) {
      console.error(error)
    }
  }

  const Preview = () => {
    return (
      <div
        className={`w-[305px] h-[175px]  p-4 rounded-lg shadow-md grid grid-rows-[105px_1fr] gap-2 relative ${
          role === 'ADMIN' ? 'bg-primary' : 'bg-[#FFFADE]'
        }`}
      >
        {user && user?.uid === user_id && (
          <IoCloseCircleOutline className='absolute top-2 right-2 text-2xl text-background' />
        )}
        <div className="grid grid-cols-[105px_1fr] gap-3">
          <div className={`rounded-lg overflow-hidden ${role === 'ADMIN' ? '' : 'shadow-md'}`}>
            {role === 'ADMIN' ? (
              <Image
                src={HadormyLogoSVG}
                alt={`${title}-ตัวอย่าง`}
                className={`transition-transform group-hover:scale-110 h-full w-full object-contain object-center`}
                loading="lazy"
                width={105}
                height={105}
              />
            ) : (
              <FirebaseImage
                imagePath={thumbnail}
                alt={`${title}-ตัวอย่าง`}
                className={`transition-transform group-hover:scale-110 h-full w-full object-cover object-center`}
                loading="lazy"
                width={105}
                height={105}
              />
            )}
          </div>
          <div>
            <h5 className="line-clamp-1">{title}</h5>
            <p className={`line-clamp-3 ${role === 'ADMIN' ? 'text-background' : 'text-gray-500'}`}>{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-sm ${role === 'ADMIN' ? 'text-background' : 'text-gray-500'}`}>
            <span>ประกาศ:</span> {convertDateFormat(timestamp)}
          </p>
          {role === 'SUPERUSER' ? (
            <FaEarthAsia className="text-2xl" />
          ) : (
            role === 'ADMIN' && <IoIosWarning className="text-alert text-2xl" />
          )}
        </div>
      </div>
    )
  }

  return (
    <TooltipMain name="คลิกเพื่อดูเพิ่มเติม">
      <Dialog>
        <DialogTrigger asChild className="cursor-pointer">
          <div>
            <Preview />
          </div>
        </DialogTrigger>
        <DialogContent className={`${role === 'ADMIN' ? 'bg-primary' : 'bg-[#FFFADE]'}`}>
          <DialogHeader className="space-y-4">
            <DialogTitle asChild className="mt-4">
              <AspectRatio ratio={16 / 9} className="rounded-sm overflow-hidden">
                {role === 'ADMIN' ? (
                  <Image
                    src={HadormyLogoSVG}
                    alt={`${title}-ตัวอย่าง`}
                    className={`transition-transform group-hover:scale-110 h-full w-full object-contain object-center`}
                    loading="lazy"
                    width={105}
                    height={105}
                  />
                ) : (
                  <FirebaseImage
                    imagePath={thumbnail}
                    alt={`${title}-ตัวอย่าง`}
                    className={`transition-transform group-hover:scale-110 h-full w-full object-cover object-center`}
                    loading="lazy"
                    width={105}
                    height={105}
                  />
                )}
              </AspectRatio>
            </DialogTitle>
            <DialogDescription className="text-lg" asChild>
              <div>
                <h3 className="text-foreground">{title}</h3>
                <h6 className={`${role === 'ADMIN' ? 'text-background' : 'text-gray-500'}`}>{description}</h6>
                <p className={`text-end ${role === 'ADMIN' ? 'text-background' : 'text-gray-500'}`}>โดย {author}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <p className={`${role === 'ADMIN' ? 'text-background' : 'text-gray-500'}`}>
                <span>ประกาศ:</span> {convertDateFormat(timestamp)}
              </p>
              {role === 'SUPERUSER' ? (
                <FaEarthAsia className="text-2xl" />
              ) : (
                role === 'ADMIN' && <IoIosWarning className="text-alert text-2xl" />
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipMain>
  )
}

export default CardAnnouncement
