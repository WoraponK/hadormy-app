// Lib
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Avatar } from '@/components/ui/avatar'

// Images
import { FaEarthAsia } from 'react-icons/fa6'
import { IoIosWarning } from 'react-icons/io'
import { imagePlaceholder } from '@/lib/others'

// Include in project
import { TUserRole } from '@/lib/type'
import { convertDateFormat } from '@/lib/others'
import Image from 'next/image'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

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
      <div className="w-full max-w-[305px] h-[175px] bg-yellow-200/50 p-4 rounded-lg shadow-md grid grid-rows-[105px_1fr] gap-2 max-md:flex max-md:flex-col max-md:h-[260px] max-md:justify-between">
        <div className="grid grid-cols-[105px_1fr] gap-3 max-md:grid-cols-1">
          <div className="rounded-lg overflow-hidden shadow-md max-md:h-[105px]">
            <Image
              src={thumbnail}
              alt={`${title}-ตัวอย่าง`}
              className="transition-transform group-hover:scale-110 h-full w-full object-cover object-center"
              loading="lazy"
              width={105}
              height={105}
            />
          </div>
          <div>
            <h5 className="line-clamp-1">{title}</h5>
            <p className="line-clamp-3 text-gray-500 max-md:line-clamp-2">{description}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 max-md:text-xs">
            <span className="max-md:hidden">ประกาศ:</span> {convertDateFormat(timestamp)}
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
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <div>
          <Preview />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={thumbnail} alt={`${title}-ตัวอย่าง`} />
            </Avatar>
            <p>{author}</p>
          </DialogDescription>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <p className="text-gray-500 max-md:text-xs">
              <span className="max-md:hidden">ประกาศ:</span> {convertDateFormat(timestamp)}
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
  )
}

export default CardAnnouncement
