'use client'

// Lib
import React from 'react'

// Images

// Include in project
import { AnnouncementListSection, DormListSection } from '@/containers/home-page'
import { TCardAnnounce, TCardDorm } from '@/lib/type'

const Home = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-primary text-6xl">อพาร์ทเม้นท์-หอพัก</h1>
        <h2>ใกล้มหาวิทยาลัยพะเยา</h2>
      </div>
      <div className="grid grid-cols-[1fr_335px] gap-4 max-lg:flex max-lg:flex-col-reverse">
        <DormListSection cardList={mockupDorm} />
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

const mockupDorm: TCardDorm[] = [
  {
    id: 1,
    name: 'อพาร์ทเม้นท์สีฟ้า',
    thumbnail: 'https://bcdn.renthub.in.th/listing_picture/201407/20140703/QVU5uQw9eaDYmPsa4TEe.jpg?class=moptimized',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    priceStart: 3000,
    priceEnd: 4000,
    timestamp: '2024-06-23T16:04:18Z',
    distance: 8000,
  },
  {
    id: 2,
    name: 'อพาร์ทเม้นท์สีฟ้า',
    thumbnail: 'https://bcdn.renthub.in.th/listing_picture/201407/20140703/QVU5uQw9eaDYmPsa4TEe.jpg?class=moptimized',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    priceStart: 3000,
    priceEnd: 4000,
    timestamp: '2024-06-23T16:04:18Z',
    distance: 632,
  },
  {
    id: 3,
    name: 'อพาร์ทเม้นท์สีฟ้า',
    thumbnail: 'https://bcdn.renthub.in.th/listing_picture/201407/20140703/QVU5uQw9eaDYmPsa4TEe.jpg?class=moptimized',
    address: 'ต.พะเยา อ.พะเยา จ.พะเยา',
    priceStart: 3000,
    priceEnd: 4000,
    timestamp: '2024-06-23T16:04:18Z',
    distance: 124,
  },
]
