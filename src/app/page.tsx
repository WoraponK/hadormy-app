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
import { subscribeToAnnounces } from '@/collections/announcementCollection'

const Home = () => {
  const [dorms, setDorms] = useState<TDorm[]>([])
  const [announcements, setAnnouncements] = useState<TCardAnnounce[]>([])
  const [dormsLoading, setDormsLoading] = useState<boolean>(true)
  const [announceLoading, setAnnounceLoading] = useState<boolean>(true)

  const [limitDorms, setLimitDorms] = useState<number>(5)
  const [limitAnnounces, setLimitAnnounces] = useState<number>(5)

  useEffect(() => {
    document.title = `หน้าหลัก - HaDormy`
  }, [])

  const fetchDorms = async () => {
    try {
      setDormsLoading(true)
      const dormsData = await getDorms(limitDorms)
      setDorms(dormsData)
    } catch (error) {
      console.error('error:', error)
    } finally {
      setDormsLoading(false)
    }
  }

  useEffect(() => {
    fetchDorms()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitDorms])

  useEffect(() => {
    const unsubscribeAnnouncements = subscribeToAnnounces((announces) => {
      try {
        setAnnounceLoading(true)
        setAnnouncements(announces.slice(0, limitAnnounces))
      } catch (error) {
        console.error('error:', error)
      } finally {
        setAnnounceLoading(false)
      }
    })

    return () => unsubscribeAnnouncements()
  }, [limitAnnounces])

  const loadMoreDorms = () => {
    setLimitDorms((prev) => prev + 5)
  }

  const loadMoreAnnounces = () => {
    setLimitAnnounces((prev) => prev + 5)
  }

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-primary text-6xl max-md:text-5xl">อพาร์ทเม้นท์-หอพัก</h1>
        <h2>ใกล้มหาวิทยาลัยพะเยา</h2>
      </div>
      <div className="grid grid-cols-[1fr_335px] gap-4 max-lg:flex max-lg:flex-col-reverse max-lg:gap-8">
        {dormsLoading ? (
          <DormListLoadingSection />
        ) : (
          <DormListSection
            cardList={dorms}
            onRefresh={fetchDorms}
            onLoadMore={loadMoreDorms}
            currentLimit={limitDorms}
          />
        )}
        {announceLoading ? (
          <AnnouncementLoadingSection />
        ) : (
          <AnnouncementListSection
            cardList={announcements}
            onLoadMore={loadMoreAnnounces}
            currentLimit={limitAnnounces}
          />
        )}
      </div>
    </div>
  )
}

export default Home
