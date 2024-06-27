// Lib
import { NextPage } from 'next'
import React from 'react'

// Include in project
import { CardDormSection, CardAnnouncementSection, CardBookingSection, ModalSignSection } from '@/containers/demo-page'

const Demo: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-12">
        <CardDormSection />
        <CardAnnouncementSection />
        <CardBookingSection />
        <ModalSignSection />
      </div>
    </div>
  )
}

export default Demo