'use client'
// Lib
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Images
import { FiGrid } from 'react-icons/fi'
import { FaShop, FaShieldHalved } from 'react-icons/fa6'
import { TUserRole } from '@/lib/type'
import { IoIosInformationCircle } from 'react-icons/io'

type Props = {
  role: TUserRole
  dormId?: string | null
  isCreated?: boolean | null
  isPending?: boolean | null
}

const PopOverManage: React.FC<Props> = ({ role, dormId, isCreated, isPending }) => {
  const convertRole = (role: TUserRole) => {
    switch (role) {
      case 'ADMIN':
        return (
          <>
            <h6 className="flex items-center space-x-2">
              <FaShieldHalved />
              <span>ผู้ดูแลระบบ</span>
            </h6>
            <Link href={'/admin/manage-user'}>
              <Button variant={'secondary'} className="w-full">
                <h6 className="flex items-center space-x-2">
                  <span>ข้อมูลผู้ใช้</span>
                </h6>
              </Button>
            </Link>
            <Link href={'/admin/approval'}>
              <Button className="w-full">
                <h6 className="flex items-center space-x-2">
                  <span>การอนุมัติ</span>
                </h6>
              </Button>
            </Link>
          </>
        )
      case 'SUPERUSER':
        return (
          <>
            <h6 className="flex items-center space-x-2">
              <FaShop />
              <span>เจ้าของหอพัก</span>
            </h6>
            {!isCreated ? (
              <Link href={'/owner/create-dorm'}>
                <Button className="w-full">
                  <h6 className="flex items-center space-x-2">
                    <span>เพิ่มหอพัก</span>
                  </h6>
                </Button>
              </Link>
            ) : (
              <>
                {isPending ? (
                  <>
                    <Link href={'/owner/approval'}>
                      <Button variant={'secondary'} className="w-full">
                        <h6 className="flex items-center space-x-2">
                          <span>การอนุมัติ</span>
                        </h6>
                      </Button>
                    </Link>
                    <Link href={`/owner/manage-dorm/${dormId}/room`}>
                      <Button className="w-full">
                        <h6 className="flex items-center space-x-2">
                          <span>จัดการห้องพัก</span>
                        </h6>
                      </Button>
                    </Link>
                    <Link href={`/owner/manage-dorm/${dormId}`}>
                      <Button className="w-full" variant="outline">
                        <h6 className="flex items-center space-x-2">
                          <span>แก้ไขรายละเอียด</span>
                        </h6>
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="py-4 flex flex-col items-center">
                      <IoIosInformationCircle className="text-4xl text-destructive" />
                      <p className="text-center">อยู่ในระหว่างการรออนุมัติจากผู้ดูแลระบบ</p>
                    </div>
                    <Link href={`/owner/manage-dorm/${dormId}`}>
                      <Button className="w-full">
                        <h6 className="flex items-center space-x-2">
                          <span>แก้ไขข้อมูลหอพัก</span>
                        </h6>
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </>
        )
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent transition-colors h-fit hover:text-gray-300 shadow-none">
          <h6 className="flex items-center space-x-2">
            <span>จัดการ</span>
            <FiGrid className="text-2xl" />
          </h6>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-2 p-2 max-w-44">{convertRole(role)}</PopoverContent>
    </Popover>
  )
}

export default PopOverManage
