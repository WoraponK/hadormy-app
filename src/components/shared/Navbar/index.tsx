'use client'

// Lib
import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// Images
import HadormyLogoSVG from '@/images/logos/hadormy-logo-full-light.svg'
import { IoMenu } from 'react-icons/io5'

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
            <div className="max-lg:hidden">
              <PopOverNotification notifications={[]} />
            </div>
            <PopOverProfile user={mockupUserData} />
          </>
        )
      case 'SUPERUSER':
        return (
          <>
            <ModalAnnounce />
            <PopOverManage role={role} />
            <div className="max-lg:hidden">
              <PopOverNotification notifications={[]} />
            </div>
            <PopOverProfile user={mockupUserData} />
          </>
        )
      case 'USER':
        return (
          <>
            <div className="max-lg:hidden">
              <PopOverNotification notifications={[]} />
            </div>
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
        <div className="flex items-center space-x-8 max-lg:space-x-4">
          <Link href={'/'}>
            <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={40} />
          </Link>
          <SearchBar />
        </div>
        <div className="justify-self-end">
          <div className="flex items-center space-x-6 max-[1200px]:space-x-2 max-lg:hidden">
            {convertRole((role as TUserRole) || '')}
          </div>
          <div className="flex items-center space-x-4 lg:hidden">
            <div className="lg:hidden">
              <PopOverNotification notifications={[]} />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost" className="hover:bg-transparent">
                  <IoMenu className="text-background text-4xl" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] max-sm:w-screen bg-foreground border-foreground">
                <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription asChild>
                    <div className="flex flex-col max-lg:items-center space-y-8">
                      {convertRole((role as TUserRole) || '')}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
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
