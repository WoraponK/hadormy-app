'use client'

// Lib
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-light.svg'

// Include in project
import {
  SearchBar,
  ModalSign,
  ModalAnnounce,
  PopOverManage,
  PopOverProfile,
  PopOverNotification,
} from '@/components/shared'
import { TUser, TUserRole } from '@/lib/type'

type Props = {
  role: TUserRole | ''
}

const Navbar: React.FC<Props> = ({ role }) => {
  const convertRole = (role: TUserRole) => {
    switch (role) {
      case 'ADMIN':
        return (
          <>
            <ModalAnnounce />
            <PopOverManage role={role} />
            <PopOverNotification notifications={[]} />
            <PopOverProfile user={mockupUserData} />
          </>
        )
      case 'SUPERUSER':
        return (
          <>
            <ModalAnnounce />
            <PopOverManage role={role} />
            <PopOverNotification notifications={[]} />
            <PopOverProfile user={mockupUserData} />
          </>
        )
      case 'USER':
        return (
          <>
            <PopOverNotification notifications={[]} />
            <PopOverProfile user={mockupUserData} />
          </>
        )
      default:
        return (
          <>
            <ModalSign />
          </>
        )
    }
  }

  return (
    <nav className={`py-5 sticky bg-foreground rounded-b-3xl z-20 left-0 top-0`}>
      <div className="container mx-auto grid grid-cols-2 h-full">
        <div className="flex items-center space-x-8">
          <Link href={'/'}>
            <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={40} />
          </Link>
          <SearchBar />
        </div>
        <div className="justify-self-end">
          <div className="flex items-center space-x-6">{convertRole((role as TUserRole) || '')}</div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

const mockupUserData: TUser = {
  id: '1',
  name: 'Hadormy',
  email: ' worapon.klabsri@gmail.com',
  phoneNumber: '0630913505',
  role: 'ADMIN',
}
