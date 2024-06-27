'use client'

// Lib
import { NextPage } from 'next'
import React from 'react'
import Image from 'next/image'

// Images

// Include in project
import { AnnouncementListSection, DormListSection } from '@/containers/home-page'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-primary text-6xl">อพาร์ทเม้นท์-หอพัก</h1>
        <h2>ใกล้มหาวิทยาลัยพะเยา</h2>
      </div>
      <div className="grid grid-cols-[1fr_335px] max-md:flex max-md:flex-col-reverse">
        <DormListSection />
        <AnnouncementListSection />
      </div>
    </div>
  )
}

export default Home
