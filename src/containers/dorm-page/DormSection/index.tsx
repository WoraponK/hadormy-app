'use client'
// Lib
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'

// Images
import IconVerifiedSVG from '@/images/common/icon-verified.svg'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { FaClipboardCheck } from 'react-icons/fa'

// Include in project
import { TDorm } from '@/lib/type'
import { convertNumberToString, formatPhoneNumber } from '@/lib/others'
import { TabThumbnail, TabBooking, TabRating } from '@/containers/dorm-page/'
import { copyTextToClipboard } from '@/lib/others'
import { useAuth } from '@/context/authContext'
import { getDormIdByUserId } from '@/collections/checkCollection'
import { getUserById } from '@/collections/usersCollection'
import { getRoomMembershipByUserId } from '@/collections/roomsCollection'
import { getIsRatedByUserId } from '@/collections/ratingsCollection'

type Props = {
  dormId: string
  dataDorm: TDorm
}

const DormSection: React.FC<Props> = ({ dormId, dataDorm }) => {
  const { toast } = useToast()
  const { user } = useAuth()
  const [isCreator, setIsCreator] = useState<boolean>(false)
  const [isSuperuser, setIsSuperuser] = useState<boolean>(false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(false)
  const [isMember, setIsMember] = useState<boolean>(false)
  const [isRated, setIsRated] = useState<boolean>(false)

  useEffect(() => {
    if (!user) return

    const fetchData = async () => {
      try {
        const [checkDormId, userData, membership] = await Promise.all([
          getDormIdByUserId(user.uid),
          getUserById(user.uid),
          getRoomMembershipByUserId(dormId, user.uid),
        ])

        setIsCreator(checkDormId === dormId)
        setIsAdmin(userData?.role === 'ADMIN')
        setIsSuperuser(userData?.role === 'SUPERUSER')
        setIsMember(membership)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const unsubscribeRated = getIsRatedByUserId(dormId, user.uid, (isRated) => {
      setIsRated(isRated)
    })

    fetchData()

    return () => {
      unsubscribeRated()
    }
  }, [user, dormId])

  const copyToClipboard = (text: string) => {
    copyTextToClipboard(text)
    toast({
      icon: <FaClipboardCheck className="text-primary" />,
      title: 'คัดลอกลงคลิปบอร์ดสำเร็จ',
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-primary line-clamp-2 max-sm:text-center">{dataDorm?.name}</h1>
        <div className="grid grid-cols-2 max-md:flex max-md:flex-col gap-8">
          <div className="space-y-4 flex flex-col max-sm:items-center">
            <h6 className="text-gray-500">{dataDorm?.address}</h6>
            <Button
              onClick={() => copyToClipboard(dataDorm?.phoneNumber)}
              className="rounded-full bg-secondary text-secondary-foreground flex justify-center items-center gap-2 text-lg p-5 w-fit"
            >
              <BsFillTelephoneFill />
              {formatPhoneNumber(dataDorm?.phoneNumber)}
            </Button>
          </div>
          <div className="space-y-4 flex flex-col max-sm:items-center">
            <div className="gap-4 flex flex-col max-md:flex-row max-md:items-center max-sm:flex-col">
              <h4>ค่าเช่า :</h4>
              <div className="flex items-end gap-2 max-sm:items-center">
                <h2 className="font-bold max-sm:text-2xl">
                  {convertNumberToString(dataDorm?.priceStart)} - {convertNumberToString(dataDorm?.priceEnd)}
                </h2>
                <p className="text-gray-500">บาท/เดือน</p>
              </div>
            </div>
            <div className="flex items-center gap-2 max-md:justify-start bg-transparent w-fit py-2 rounded-full">
              <Image src={IconVerifiedSVG} alt="IconVerifiedSVG" />
              <h5 className="text-success">ลงทะเบียนที่พักแล้ว</h5>
            </div>
          </div>
        </div>
      </div>
      <Tabs defaultValue="thumbnail" className="space-y-8">
        <TabsList className="max-md:w-full">
          <TabsTrigger value="thumbnail" className="px-8 max-md:w-full">
            รูปภาพ
          </TabsTrigger>
          <TabsTrigger value="booking" className="px-8 max-md:w-full">
            จอง
          </TabsTrigger>
          <TabsTrigger value="rating" className="px-8 max-md:w-full">
            คะแนน
          </TabsTrigger>
        </TabsList>
        <TabsContent value="thumbnail">
          <TabThumbnail
            priceStart={dataDorm?.priceStart}
            priceEnd={dataDorm?.priceEnd}
            description={dataDorm?.description}
            bill={dataDorm?.bill}
            distance={dataDorm?.distance}
            thumbnail={dataDorm?.thumbnail}
          />
        </TabsContent>
        <TabsContent value="booking">
          <TabBooking
            isAdmin={isAdmin}
            isCreator={isCreator}
            isSuperuser={isSuperuser}
            dormId={dormId}
            rooms={dataDorm?.rooms}
          />
        </TabsContent>
        <TabsContent value="rating">
          <TabRating
            userId={user && user.uid}
            isAdmin={isAdmin}
            isCreator={isCreator}
            isSuperuser={isSuperuser}
            isMember={isMember}
            isRated={isRated}
            dormId={dormId}
            rating={dataDorm?.rating}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DormSection
