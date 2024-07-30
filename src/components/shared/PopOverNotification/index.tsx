// Lib
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { AvatarImage, Avatar } from '@/components/ui/avatar'

// Images
import { FaRegBell, FaBell } from 'react-icons/fa6'
import { TNotification } from '@/lib/type'

// Include in project
import { convertDateFormat } from '@/lib/others'

type Props = {
  notifications: TNotification[]
}

const PopOverNotification: React.FC<Props> = ({ notifications }) => {
  notifications.sort((a, b) => (new Date(b.updateAt) as any) - (new Date(a.updateAt) as any))

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent transition-colors hover:text-gray-300 shadow-none">
          <FaRegBell className="text-2xl" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden">
        <div className="flex items-center space-x-2 text-primary">
          <FaBell className="text-lg" />
          <h4>การแจ้งเตือน</h4>
        </div>
        <div className="divide-y-2 overflow-auto h-full max-h-80">
          {notifications.map((noti, index) => (
            <div key={index} className="py-2 flex space-x-2 items-center">
              <Avatar>
                <AvatarImage src={noti.image} alt={`${noti.title}-noti`} className="object-cover object-center" />
              </Avatar>
              <div>
                <h6>{noti.title}</h6>
                <p className="text-gray-400 text-sm">{convertDateFormat(noti.updateAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PopOverNotification
