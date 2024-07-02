// Lib
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Images
import NotFoundSVG from '@/images/common/404.svg'

const NotFound = () => {
  return (
    <div className="container mx-auto min-h-screen grid place-items-center">
      <div className="text-center space-y-16 flex flex-col items-center">
        <Image src={NotFoundSVG} alt="NotFoundSVG" height={250} />
        <div className="text-primary animate-pulse">
          <h1 className="text-9xl ">404</h1>
          <h2>ERROR</h2>
        </div>
        <div>
          <h3>อุ๊ปส์! ไม่พบหน้าที่คุณต้องการ</h3>
          <p>
            ต้องการกลับไปยัง{' '}
            <Link href={'/'} className="text-primary hover:underline">
              หน้าหลัก
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
