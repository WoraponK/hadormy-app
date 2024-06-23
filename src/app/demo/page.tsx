// Lib
import { NextPage } from 'next'
import React from 'react'

// Include in project
import { CardDormSection, CardAnnouncementSection } from '@/containers/demo-page'

const Demo: NextPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-8">
        <CardDormSection />
        <CardAnnouncementSection />
      </div>
    </div>
  )
}

export default Demo
