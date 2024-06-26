'use client'

// Lib
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-light.svg'

// Include in project
import path from '@/lib/path'

const Navbar: React.FC = () => {
  const [isShow, setIsShow] = useState(true)

  let lastScroll = 0
  const threshold = 1

  const handleScroll = () => {
    if (window.scrollY - lastScroll >= threshold) {
      setIsShow(false)
    } else {
      setIsShow(true)
    }
    lastScroll = window.scrollY
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav
      className={`h-[100px] sticky bg-foreground transition-all duration-300 rounded-b-xl z-20 ${
        isShow ? 'top-0' : 'top-[-12rem]'
      } left-0`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href={'/'}>
          <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={55} />
        </Link>
        <div className="space-x-4 ">
          {path?.map((ele, index) => (
            <Link href={ele.href} key={index} className="text-background">
              {ele.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
