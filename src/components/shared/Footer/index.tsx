'use client'

// Lib
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-light.svg'

// Include in project

const toolsData = [
  {
    title: 'ติดต่อ',
    list: [
      {
        href: '',
        name: 'Facebook',
      },
    ],
  },
  {
    title: 'เกี่ยวกับเรา',
    list: [
      {
        href: '',
        name: 'รายงานปัญหา',
      },
      {
        href: '/privacy-policy',
        name: 'นโยบายความเป็นส่วนตัว',
      },
      {
        href: '/terms-of-use',
        name: 'ข้อตกลงการใช้งาน',
      },
    ],
  },
]

const Footer: React.FC = () => {
  return (
    <footer className=" py-8 bg-foreground rounded-t-3xl">
      <div className="container mx-auto text-background py-6 flex gap-8 justify-between max-md:flex-col max-md:items-center">
        <div className="flex flex-col gap-4 max-md:items-center">
          <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" />
          <h5 className="text-center">© 2024 HaDormy. All Rights Reserved</h5>
        </div>
        <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
          {toolsData.map((tool) => (
            <div key={tool.title} className="space-y-2">
              <h3 className="max-sm:text-center">{tool.title}</h3>
              <div className="flex flex-col gap-1">
                {tool.list.map((list, index) => (
                  <Link key={index} href={list.href} className="max-sm:text-center underline-offset-2 hover:underline">
                    {list.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
