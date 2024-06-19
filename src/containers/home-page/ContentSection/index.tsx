// Lib
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Images
import DuckWalkingGIF from '@/images/common/duck-walking.gif'

// Include in project
import social from '@/lib/social'

const ContentSection: React.FC = () => {
  return (
    <div className="container mx-auto py-20">
      <div className="flex flex-col items-center space-y-8 text-center">
        <Image src={DuckWalkingGIF} alt="DuckWalkingGIF" height={200} />
        <div>
          <h3>TEMPLATE NEXTJS, TAILWINDCSS, SHADCN</h3>
          <h4>
            By <span className="text-secondary">WoraponK</span>
          </h4>
        </div>
        <div className="flex gap-4 flex-wrap text-4xl">
          {social?.map((ele, index) => (
            <a key={index} href={ele.href} className="transition-colors hover:text-black/60" target="_blank">
              {ele.logo}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContentSection
