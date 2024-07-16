'use client'

// Lib
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-light.svg'

// Include in project

const Navbar: React.FC = () => {
  return (
    <nav className={`py-5 sticky bg-foreground rounded-b-3xl z-20 left-0 top-0`}>
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link href={'/'}>
          <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={40} />
        </Link>
        <div className="space-x-4 ">
          <Link href={'/demo'} className="text-background">
            Demo
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
