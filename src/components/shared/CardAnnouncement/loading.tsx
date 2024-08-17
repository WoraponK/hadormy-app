// Lib
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CardAnnouncementLoading: React.FC = () => {
  return (
    <Skeleton className="w-[305px] h-[175px] bg-[#FFFADE] rounded-lg shadow-sm p-4 grid grid-rows-[105px_1fr] gap-2">
      <div className="grid grid-cols-[105px_1fr] gap-3">
        <div className={`rounded-lg overflow-hidden`}>
          <div className="w-[105px] h-[105px] bg-gray-200"></div>
        </div>
        <div className="space-y-2">
          <div className="bg-gray-200 h-8 rounded-full"></div>
          <div className="bg-gray-200 h-4 rounded-full"></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-3 rounded-full w-full bg-gray-200"></div>
      </div>
    </Skeleton>
  )
}

export default CardAnnouncementLoading
