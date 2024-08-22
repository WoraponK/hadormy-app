// Lib
import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const DormLoadingSection: React.FC = () => {
  return (
    <Skeleton className="space-y-8">
      <div className="space-y-2">
        <div className="h-12 w-1/2 bg-gray-300 rounded-full"></div>
        <div className="grid grid-cols-2 max-md:flex max-md:flex-col gap-8">
          <div className="space-y-4 flex flex-col max-sm:items-center">
            <div className="h-8 w-full bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="h-6 px-8 max-md:w-full bg-gray-300 rounded-full"></div>
        <div className="h-6 px-8 max-md:w-full bg-gray-300 rounded-full"></div>
        <div className="h-6 px-8 max-md:w-full bg-gray-300 rounded-full"></div>
      </div>
      <div className="px-20 max-lg:px-0">
        <div className="w-full aspect-video bg-gray-300 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-8">
        <div className="space-y-2">
          <div className="h-8 w-full bg-gray-300 rounded-full"></div>
          <div className="h-8 w-1/2 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      </div>
    </Skeleton>
  )
}

export default DormLoadingSection
