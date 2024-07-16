'use client'

// Lib
import React, { useEffect } from 'react'

// Images

// Include in project
import { AnnouncementListSection, DormListSection } from '@/containers/home-page'
import { EDormType, TCardAnnounce, TDorm } from '@/lib/type'

const Home = () => {
  useEffect(() => {
    document.title = `หน้าหลัก - HaDormy`
  }, [])

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-primary text-6xl">อพาร์ทเม้นท์-หอพัก</h1>
        <h2>ใกล้มหาวิทยาลัยพะเยา</h2>
      </div>
      <div className="grid grid-cols-[1fr_335px] gap-4 max-lg:flex max-lg:flex-col-reverse max-lg:gap-8">
        <DormListSection cardList={mockupDataDorm} />
        <AnnouncementListSection cardList={mockupAnnounce} />
      </div>
    </div>
  )
}

export default Home

const mockupAnnounce: TCardAnnounce[] = [
  {
    id: 1,
    author: 'worapon',
    title: 'ไฟดับ',
    description: 'สวัสดีครับ',
    role: 'ADMIN',
    timestamp: '2024-06-27T16:05Z',
  },
  {
    id: 2,
    author: 'worapon',
    title: 'ไฟดับ',
    description: 'สวัสดีครับ',
    role: 'SUPERUSER',
    timestamp: '2024-06-27T16:05Z',
  },
  {
    id: 3,
    author: 'worapon',
    title: 'ไฟดับ',
    description: 'สวัสดีครับ',
    role: 'SUPERUSER',
    timestamp: '2024-06-27T16:05Z',
  },
]

const mockupDataDorm: TDorm[] = [
  {
    id: '1',
    type: EDormType.All,
    timestamp: '2024-05-27T16:05Z',
    name: 'อพาร์ทเม้นท์สีฟ้า',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 412,
    phoneNumber: '0630913505',
    priceStart: 2500,
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
  },
  {
    id: '2',
    type: EDormType.Male,
    timestamp: '2024-06-22T16:05Z',
    name: 'อพาร์ทเม้นท์สีส้ม',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 150,
    phoneNumber: '0123465789',
    priceStart: 1000,
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
      'https://castfromclay.co.uk/wp-content/uploads/image-asset-1-1024x683.jpeg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      'https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg',
    ],
  },
  {
    id: '3',
    type: EDormType.Female,
    timestamp: '2024-02-01T16:05Z',
    name: 'อพาร์ทเม้นท์สีเขียว',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 5000,
    phoneNumber: '0123465789',
    priceStart: 2700,
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
      'https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg',
      'https://castfromclay.co.uk/wp-content/uploads/image-asset-1-1024x683.jpeg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
    ],
  },
  {
    id: '4',
    type: EDormType.All,
    timestamp: '2024-03-12T16:05Z',
    name: 'อพาร์ทเม้นท์สีฟ้า',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 512,
    phoneNumber: '0630913505',
    priceStart: 3500,
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
  },
  {
    id: '5',
    type: EDormType.Male,
    timestamp: '2024-06-25T16:05Z',
    name: 'อพาร์ทเม้นท์สีส้ม',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 350,
    phoneNumber: '0123465789',
    priceStart: 3200,
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
      'https://castfromclay.co.uk/wp-content/uploads/image-asset-1-1024x683.jpeg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      'https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg',
    ],
  },
  {
    id: '6',
    type: EDormType.All,
    timestamp: '2024-07-04T16:05Z',
    name: 'อพาร์ทเม้นท์สีเขียว',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis modi, harum ex dignissimos nulla beatae facilis, quisquam ipsum unde fugiat mollitia, nobis molestias illum vitae nostrum culpa exercitationem commodi autem eveniet hic. Harum, eaque temporibus ratione cupiditate quos veritatis provident aliquid similique asperiores sed labore praesentium nihil dignissimos distinctio eum!',
    distance: 1200,
    phoneNumber: '0123465789',
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
      'https://cdn.pixabay.com/photo/2019/01/28/02/10/girl-taking-photo-3959468_1280.jpg',
      'https://castfromclay.co.uk/wp-content/uploads/image-asset-1-1024x683.jpeg',
      'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
    ],
  },
]
