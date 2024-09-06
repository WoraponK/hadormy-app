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
import { IoArrowUp } from 'react-icons/io5'

// Include in project
import {
  SearchBar,
  ModalSign,
  ModalAnnounce,
  PopOverManage,
  PopOverProfile,
  PopOverNotification,
} from '@/components/shared'
import { TNotification, TUser, TUserRole } from '@/lib/type'
import { listenToUserById, stopListeningToUser } from '@/collections/usersCollection'
import { LoadingSpinner } from '@/components/shared'
import { checkHaveDorm } from '@/collections/checkCollection'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { getDormById } from '@/collections/dormsCollection'
import { subscribeToNotifications } from '@/collections/notificationCollection'

const Navbar: React.FC = () => {
  const { user, loading } = useAuth()
  const [userData, setUserData] = useState<TUser | null>(null)
  const [haveDorm, setHaveDorm] = useState<boolean | null>(null)
  const [dormIdManage, setDormIdMange] = useState<string | null>(null)
  const [dormPending, setDormPending] = useState<boolean | undefined>(undefined)
  const [notifications, setNotifications] = useState<TNotification[]>([])

  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true)
      } else {
        setShowScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!user) {
      // Reset states on logout
      setUserData(null)
      setHaveDorm(null)
      setDormIdMange(null)
      setDormPending(undefined)
      setNotifications([])
      return
    }

    const unsubscribeUser = listenToUserById(user.uid, setUserData)
    const unsubscribeNoti = subscribeToNotifications(user.uid as string, (notifications) => {
      try {
        setNotifications(notifications)
      } catch (error) {
        console.error(error)
      }
    })

    return () => {
      stopListeningToUser(unsubscribeUser)
      unsubscribeNoti()
    }
  }, [user])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userData) return
        const checkHaveDormData = await checkHaveDorm(userData.id as string)
        const dormId = await getDormIdByUserId(userData.id as string)
        setHaveDorm(checkHaveDormData)
        setDormIdMange(dormId)
      } catch (error) {
        console.error(error)
      }
    }

    const fetchDorm = async () => {
      try {
        if (!dormIdManage) return
        const dormData = await getDormById(dormIdManage)
        setDormPending(dormData?.is_activated)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUser()
    fetchDorm()
  }, [userData, dormIdManage, notifications])

  const convertRole = (role: TUserRole) => {
    switch (role) {
      case 'ADMIN':
        return (
          <>
            <ModalAnnounce />
            <PopOverManage role={role} />
            <div className="max-lg:hidden">
              <PopOverNotification userId={userData && userData.id} notifications={notifications} />
            </div>
            <PopOverProfile user={userData} />
          </>
        )
      case 'SUPERUSER':
        return (
          <>
            {haveDorm && dormPending && <ModalAnnounce />}
            <PopOverManage role={role} dormId={dormIdManage} isCreated={haveDorm} isPending={dormPending} />
            <div className="max-lg:hidden">
              <PopOverNotification userId={userData && userData.id} notifications={notifications} />
            </div>
            <PopOverProfile user={userData} />
          </>
        )
      case 'USER':
        return (
          <>
            <div className="max-lg:hidden">
              <PopOverNotification userId={userData && userData.id} notifications={notifications} />
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
    <>
      <nav className={`py-5 sticky bg-foreground rounded-b-3xl z-20 left-0 top-0`}>
        <div className="container mx-auto grid grid-cols-2 gap-4 h-full">
          <div className="flex items-center space-x-8 max-lg:space-x-4">
            <Link href={'/'}>
              <Image src={HadormyLogoSVG} alt="HadormyLogoSVG" height={40} priority />
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
                      <PopOverNotification userId={userData && userData.id} notifications={notifications} />
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
      {showScroll && (
        <Button
          className={`w-[50px] h-[50px] rounded-full fixed bottom-4 right-4 bg-primary text-background transition-all `}
          onClick={scrollToTop}
        >
          <IoArrowUp className="text-background text-3xl absolute" />
        </Button>
      )}
    </>
  )
}

export default Navbar
