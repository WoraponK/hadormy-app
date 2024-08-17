'use client'

// Lib
import React, { useEffect, useState } from 'react'

// Images

// Include in project
import {
  AnnouncementListSection,
  DormListSection,
  DormListLoadingSection,
  AnnouncementLoadingSection,
} from '@/containers/home-page'
import { TCardAnnounce, TDorm } from '@/lib/type'
import { getDorms } from '@/collections/dormsCollection'
import { getAnnounces } from '@/collections/announcementCollection'

const Home = () => {
  const [dorms, setDorms] = useState<TDorm[]>([])
  const [announcements, setAnnouncements] = useState<TCardAnnounce[]>([])
  const [dormsLoading, setDormsLoading] = useState<boolean>(true)
  const [announceLoading, setAnnounceLoading] = useState<boolean>(true)

  useEffect(() => {
    document.title = `หน้าหลัก - HaDormy`
  }, [])

  useEffect(() => {
    const fetchDorms = async () => {
      try {
        setDormsLoading(true)
        const dormsData = await getDorms()
        setDorms(dormsData)
      } catch (error) {
        console.log('error:', error)
      } finally {
        setDormsLoading(false)
      }
    }

    const fetchAnnouncements = async () => {
      try {
        setAnnounceLoading(true)
        const announcementsData = await getAnnounces()
        setAnnouncements(announcementsData)
      } catch (error) {
        console.log('error:', error)
      } finally {
        setAnnounceLoading(false)
      }
    }

    fetchDorms()
    fetchAnnouncements()
  }, [])

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-primary text-6xl max-md:text-5xl">อพาร์ทเม้นท์-หอพัก</h1>
        <h2>ใกล้มหาวิทยาลัยพะเยา</h2>
      </div>
      <div className="grid grid-cols-[1fr_335px] gap-4 max-lg:flex max-lg:flex-col-reverse max-lg:gap-8">
        {dormsLoading ? <DormListLoadingSection /> : <DormListSection cardList={dorms} />}
        {announceLoading ? <AnnouncementLoadingSection /> : <AnnouncementListSection cardList={announcements} />}
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
    timestamp: '2024-06-27T16:20Z',
  },
  {
    id: 2,
    author: 'worapon',
    title: 'ไฟดับ',
    description: 'สวัสดีครับ',
    role: 'SUPERUSER',
    timestamp: '2024-06-27T16:02Z',
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
