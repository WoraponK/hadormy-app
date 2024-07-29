// Lib
import React from 'react'

// Include in project
import { PopOverNotification } from '@/components/shared'
import { TNotification } from '@/lib/type'

const PopOverNotificationSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">PopOverNotification</h2>
      <h6>
        The <span className="text-primary">PopOverNotification</span> have no props.
      </h6>
      <div className="bg-foreground rounded-lg p-4 flex justify-center items-center">
        <PopOverNotification notifications={mockup} />
      </div>
    </div>
  )
}

export default PopOverNotificationSection

const mockup: TNotification[] = [
  {
    id: '1',
    title: 'title-1',
    updateAt: '2024-07-28T15:00Z',
    image: 'https://www.spongebobshop.com/cdn/shop/products/SB-Standees-Spong-3_1200x.jpg?v=1603744568',
  },
  {
    id: '2',
    title: 'title-2',
    updateAt: '2024-07-28T15:02Z',
    image: 'https://cdn.shopify.com/s/files/1/2393/5817/files/6eaedeb6-dd5a-4597-8976-247f08418c99.jpg?v=1692953727',
  },
  {
    id: '3',
    title: 'title-3',
    updateAt: '2024-07-28T15:12Z',
    image: 'https://cdn.shopify.com/s/files/1/2393/5817/files/renditionfile_6.jpg?v=1692953765',
  },
  {
    id: '4',
    title: 'title-4',
    updateAt: '2024-07-28T15:01Z',
    image: 'https://cdn.shopify.com/s/files/1/2393/5817/files/renditionfile_6.jpg?v=1692953765',
  },
  {
    id: '5',
    title: 'title-5',
    updateAt: '2024-07-28T15:45Z',
    image: 'https://cdn.shopify.com/s/files/1/2393/5817/files/renditionfile_6.jpg?v=1692953765',
  },
  {
    id: '6',
    title: 'title-6',
    updateAt: '2024-07-28T15:32Z',
    image: 'https://cdn.shopify.com/s/files/1/2393/5817/files/renditionfile_6.jpg?v=1692953765',
  },
]
