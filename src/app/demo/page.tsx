// Lib
import { NextPage } from 'next'
import React from 'react'

// Include in project
import {
  CardDormSection,
  CardAnnouncementSection,
  CardBookingSection,
  ModalSignSection,
  ModalAnnounceSection,
  RatingStarSection,
  FaqListSection,
  PopOverNotificationSection,
  PopOverProfileSection,
  PopOverManageSection,
  SearchBarSection,
  CardDormSearchSection,
} from '@/containers/demo-page'

const Demo: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-12">
        <SearchBarSection />
        <CardDormSection />
        <CardDormSearchSection />
        <CardAnnouncementSection />
        <CardBookingSection />
        <ModalSignSection />
        <ModalAnnounceSection />
        <RatingStarSection />
        <FaqListSection />
        <PopOverNotificationSection />
        <PopOverProfileSection />
        <PopOverManageSection />
      </div>
    </div>
  )
}

export default Demo
