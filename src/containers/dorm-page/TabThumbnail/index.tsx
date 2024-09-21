// Lib
import React from 'react'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

// Images
import { MdDirectionsRun } from 'react-icons/md'

// Include in project
import { TBill } from '@/lib/type'
import { calDistance, convertNumberToString } from '@/lib/others'
import FirebaseImage from '@/components/common/FirebaseImage'

type Props = {
  priceStart: number
  priceEnd: number
  thumbnail: string[]
  description: string
  bill: TBill
  distance: number
}

const TabThumbnail: React.FC<Props> = ({ priceStart, priceEnd, thumbnail, description, bill, distance }) => {
  const packBill = [
    {
      title: 'รายเดือน',
      result: `${convertNumberToString(priceStart)} - ${convertNumberToString(priceEnd)} บาท/เดือน`,
    },
    {
      title: 'เงินประกัน',
      result: `${bill?.bail ? `${convertNumberToString(bill.bail)} บาท` : 'ติดต่อสอบถาม'}`,
    },
    {
      title: 'จ่ายล่วงหน้า',
      result: `${bill?.deposit ? `${convertNumberToString(bill.deposit)} บาท` : 'ติดต่อสอบถาม'}`,
    },
    {
      title: 'ค่าไฟ',
      result: `${bill?.electric ? `${convertNumberToString(bill.electric)} บาท/หน่วย` : '-'}`,
    },
    {
      title: 'ค่าน้ำ',
      result: `${bill?.water ? `${convertNumberToString(bill.water)} บาท/หน่วย` : '-'}`,
    },
    {
      title: 'ค่าอินเทอร์เน็ต',
      result: `${bill?.internet ? `${convertNumberToString(bill.internet)} บาท` : 'ติดต่อสอบถาม'}`,
    },
    {
      title: 'ค่าบริการอื่น ๆ',
      result: `${bill?.service ? `${convertNumberToString(bill.service)} บาท` : 'ติดต่อสอบถาม'}`,
    },
  ]

  return (
    <div className="space-y-8">
      <Carousel>
        <CarouselContent className="px-40 max-lg:px-0">
          {thumbnail?.map((ele, index) => (
            <CarouselItem key={index}>
              <AspectRatio ratio={16 / 9} className="h-full">
                <FirebaseImage
                  imagePath={ele}
                  alt={`ตัวอย่าง-${index + 1}`}
                  className="rounded-lg object-cover object-center h-full w-full"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h3>รายละเอียด</h3>
            <p>{description}</p>
          </div>
          <p className="text-gray-500 flex place-self-end items-center space-x-1">
            <MdDirectionsRun className="text-xl" />
            <span>ห่างจากหน้ามหาลัย ~{calDistance(distance)}</span>
          </p>
        </div>
        <div className="h-full bg-gray-200 rounded-lg shadow-md p-4 divide-gray-300/40 divide-y-2">
          {packBill.map((ele, index) => (
            <div key={index} className="flex justify-between py-2 ">
              <h6>{ele.title}</h6>
              <p>{ele.result}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TabThumbnail
