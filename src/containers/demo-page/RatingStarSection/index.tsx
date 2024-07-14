// Lib
import React from 'react'

// Include in project
import { RatingStar } from '@/components/shared'

const RatingStarSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">RatingStar</h2>
      <h6>
        The <span className="text-primary">RatingStar</span> have no props.
      </h6>
      <div className="bg-background rounded-lg flex justify-center items-center p-4 flex-col gap-4">
        <RatingStar rating={4} />
      </div>
    </div>
  )
}

export default RatingStarSection
