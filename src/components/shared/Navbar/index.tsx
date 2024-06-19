'use client'

// Lib
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

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
      className={`sticky bg-background transition-all duration-300 ${
        isShow ? 'top-0' : 'top-[-12rem]'
      } left-0 border-b border-dark`}
    >
      <div className="container mx-auto flex items-center justify-between py-6">
        <Link href={'/'}>
          <h4>YOUR LOGO</h4>
        </Link>
        <div className="space-x-4">
          {path?.map((ele, index) => (
            <Link href={ele.href} key={index}>
              {ele.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
