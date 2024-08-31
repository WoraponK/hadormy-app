'use client'
// Lib
import React from 'react'
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

type Props = {
  dormId: string
  dataDorm: TDorm
}

const DormSection: React.FC<Props> = ({ dormId, dataDorm }) => {
  const { toast } = useToast()

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
            <div className="flex items-center gap-2 max-md:justify-start">
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
          <TabBooking dormId={dormId} rooms={dataDorm?.rooms} />
        </TabsContent>
        <TabsContent value="rating">
          <TabRating dormId={dormId} rating={dataDorm?.rating} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DormSection
