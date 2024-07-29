'use client'

// Lib
import React from 'react'

// Include in project
import { CardDormSearch } from '@/components/shared'

const CardDormSearchSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">CardDormSearch</h2>
      <h6>
        The <span className="text-primary">CardDormSearch</span> have no props.
      </h6>
      <div className="bg-background rounded-lg flex justify-center items-center p-4 flex-col gap-4">
        <CardDormSearch
          id={`1`}
          thumbnail="https://upload.wikimedia.org/wikipedia/commons/8/84/Sharp_Hall_Dorm_Room.jpg"
          name="Red"
          priceStart={1000}
          priceEnd={2000}
          distance={400}
        />
      </div>
    </div>
  )
}

export default CardDormSearchSection
