// Lib
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const CardDorm: React.FC = ({}) => {
  return (
    <Skeleton className="h-[190px] w-full bg-background rounded-lg p-4 grid grid-cols-[200px_1fr] gap-8 group max-md:flex max-md:flex-col max-md:h-fit max-md:gap-4">
      <div className="flex flex-col justify-between gap-4">
        <div className="h-[120px] w-full rounded-lg overflow-hidden bg-gray-200"></div>
        <div className="h-[20px] w-full bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex flex-col justify-between space-y-2">
        <div className="space-y-2">
          <div className="bg-gray-200 h-8 w-3/4 rounded-full"></div>
          <div className="bg-gray-200 h-5 w-1/3 line-clamp-2 rounded-full"></div>
        </div>
        <div className="flex place-self-end items-center space-x-1">
          <div className="w-5 aspect-square bg-gray-200 rounded-full"></div>
          <div className="h-5 w-[100px] bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </Skeleton>
  )
}

export default CardDorm
