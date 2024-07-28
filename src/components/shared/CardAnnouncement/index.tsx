// Lib
import React from 'react'
import Image from 'next/image'

// Images
import { FaEarthAsia } from 'react-icons/fa6'
import { IoIosWarning } from 'react-icons/io'
import { imagePlaceholder } from '@/lib/others'
import HadormyLogoSVG from '@/images/logos/hadormy-logo-mini-color.svg'

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
import { Avatar } from '@/components/ui/avatar'
import { AspectRatio } from '@/components/ui/aspect-ratio'

import TooltipMain from '@/components/ui/tooltip-main'

type Props = {
  title: string
  description: string
  thumbnail?: string
  role: TUserRole
  timestamp: string
  author: string
}

const CardAnnouncement: React.FC<Props> = ({
  title,
  description,
  thumbnail = imagePlaceholder,
  role,
  timestamp,
  author,
}) => {
  const Preview = () => {
    return (
      <div className="w-[305px] h-[175px] bg-[#FFFADE] p-4 rounded-lg shadow-md grid grid-rows-[105px_1fr] gap-2">
        <div className="grid grid-cols-[105px_1fr] gap-3">
          <div className={`rounded-lg overflow-hidden ${role === 'ADMIN' ? '' : 'shadow-md'}`}>
            <Image
              src={role === 'ADMIN' ? HadormyLogoSVG : thumbnail}
              alt={`${title}-ตัวอย่าง`}
              className={`transition-transform group-hover:scale-110 h-full w-full ${
                role === 'ADMIN' ? 'object-contain' : 'object-cover object-center'
              }`}
              loading="lazy"
              width={105}
              height={105}
            />
          </div>
          <div>
            <h5 className="line-clamp-1">{title}</h5>
            <p className="line-clamp-3 text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">
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
        <DialogContent className="bg-[#FFFADE]">
          <DialogHeader className="space-y-4">
            <DialogTitle asChild className="mt-4">
              <AspectRatio ratio={16 / 9} className="rounded-sm overflow-hidden">
                <Image
                  src={role === 'ADMIN' ? HadormyLogoSVG : thumbnail}
                  alt={`${title}-ตัวอย่าง`}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </AspectRatio>
            </DialogTitle>
            <DialogDescription className="text-lg" asChild>
              <div>
                <h3 className="text-foreground">{title}</h3>
                <h6 className="text-gray-500">{description}</h6>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <p className="text-gray-500">
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
