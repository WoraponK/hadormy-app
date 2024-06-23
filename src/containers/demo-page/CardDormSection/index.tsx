'use client'

// Lib
import React from 'react'

// Include in project
import { CardDorm } from '@/components/shared'

const CardDormSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2>CardDorm</h2>
      <h6>
        The <span className="text-primary">CardDorm</span> have props name, thumbnail, address, priceStart, priceEnd,
        timestamp, distance.
      </h6>
      <div className="bg-background rounded-lg flex justify-center items-center p-4">
        <CardDorm
          name="อพาร์ทเม้นท์สีฟ้า"
          thumbnail="https://bcdn.renthub.in.th/listing_picture/201407/20140703/QVU5uQw9eaDYmPsa4TEe.jpg?class=moptimized"
          address="ต.พะเยา อ.พะเยา จ.พะเยา"
          priceStart={3000}
          priceEnd={4000}
          timestamp="2024-06-23T16:04:18Z"
          distance={8000}
          onClick={() => console.log('clicked!')}
        />
      </div>
    </div>
  )
}

export default CardDormSection
