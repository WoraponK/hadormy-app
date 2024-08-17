'use client'

// Lib
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/context/authContext'

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
import { getUserById } from '@/collections/usersCollection'
import { LoadingSpinner } from '@/components/shared'

const Navbar: React.FC = () => {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<TUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const data = await getUserById(user.uid)
          setUserData(data)
        } else {
          setUserData(null)
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchUser()
  }, [user])

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
            <PopOverProfile user={userData} />
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
            <PopOverProfile user={userData} />
          </>
        )
      case 'USER':
        return (
          <>
            <div className="max-lg:hidden">
              <PopOverNotification notifications={[]} />
            </div>
            <PopOverProfile user={userData} />
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

  const userRole = userData?.role || ''

  return (
    <nav className={`py-5 sticky bg-foreground rounded-b-3xl z-20 left-0 top-0`}>
      <div className="container mx-auto grid grid-cols-2 gap-4 h-full">
        <div className="flex items-center space-x-8 max-lg:space-x-4">
          <Link href={'/'}>
            <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={40} />
          </Link>
          <SearchBar />
        </div>
        <div className="justify-self-end flex items-center justify-center">
          {loading ? (
            <LoadingSpinner className="text-background" />
          ) : (
            <>
              <div className="flex items-center space-x-6 max-[1200px]:space-x-2 max-lg:hidden">
                {convertRole((userRole as TUserRole) || '')}
              </div>
              <div className="flex items-center space-x-4 lg:hidden">
                {userRole !== '' && (
                  <div className="lg:hidden">
                    <PopOverNotification notifications={[]} />
                  </div>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" variant="ghost" className="hover:bg-transparent">
                      <IoMenu className="text-background text-4xl" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="max-w-[400px] bg-foreground border-foreground">
                    <SheetHeader>
                      <SheetTitle>Are you absolutely sure?</SheetTitle>
                      <SheetDescription asChild>
                        <div className="flex flex-col max-lg:items-center space-y-8">
                          {convertRole((userRole as TUserRole) || '')}
                        </div>
                      </SheetDescription>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
