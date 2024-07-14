'use client'

// Lib
import React, { useEffect } from 'react'

// Include in project
import { DormSection } from '@/containers/dorm-page'
import { TDorm } from '@/lib/type'

const Dorm = ({ params }: { params: { dormId: string } }) => {
  useEffect(() => {
    document.title = `หอพัก - HaDormy`
  }, [])

  return (
    <div className="container mx-auto min-h-screen">
      <DormSection dataDorm={mockupDataDorm} />
    </div>
  )
}

export default Dorm

const mockupDataDorm: TDorm = {
  id: '',
  name: 'อพาร์ทเม้นท์สีฟ้า',
  address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
  distance: 800,
  phoneNumber: '0630913505',
  priceStart: 3000,
  priceEnd: 4000,
  bill: {
    bail: 0,
    deposit: 0,
    electic: 0,
    internet: 0,
    service: 0,
    water: 0,
  },
  rating: 3.5,
  rooms: [
    {
      id: '101',
      name: '101',
      price: 3000,
      isAvailable: true,
    },
    {
      id: '102',
      name: '102',
      price: 3000,
      isAvailable: true,
    },
    {
      id: '103',
      name: '103',
      price: 3000,
      isAvailable: true,
    },
    {
      id: '104',
      name: '104',
      price: 3000,
      isAvailable: true,
    },
    {
      id: '105',
      name: '105',
      price: 3000,
      isAvailable: true,
    },
  ],
  thumbnail: [
    'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
    'https://castfromclay.co.uk/wp-content/uploads/image-asset-1-1024x683.jpeg',
    'https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg',
  ],
}
