'use client'
// Lib
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { AvatarImage, Avatar } from '@/components/ui/avatar'

// Images
import { FaShop, FaUser, FaShieldHalved } from 'react-icons/fa6'
import { LuLogOut } from 'react-icons/lu'
import { TUser, TUserRole } from '@/lib/type'

type Props = {
  user: TUser
}

const PopOverProfile: React.FC<Props> = ({ user }) => {
  const convertRole = (role: TUserRole) => {
    switch (role) {
      case 'ADMIN':
        return (
          <>
            <FaShieldHalved />
            <span>ผู้ดูแลระบบ</span>
          </>
        )
      case 'SUPERUSER':
        return (
          <>
            <FaShop />
            <span>เจ้าของหอพัก</span>
          </>
        )
      case 'USER':
        return (
          <>
            <FaUser />
            <span>ผู้เช่า</span>
          </>
        )
    }
  }

  const handleLogout = () => {
    console.log('Logout!')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent transition-colors h-fit w-full max-w-64 shadow-none">
          <div className="flex w-full items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={`https://placehold.jp/72/00bbf9/ffffff/150x150.png?text=${user.name?.[0]}&css=%7B%22font-weight%22%3A%22bold%22%7D`}
              />
            </Avatar>
            <div className="w-full">
              <p className="text-sm text-secondary flex items-center space-x-1">{convertRole(user.role)}</p>
              <h6 className="text-background text-start line-clamp-1 text-wrap">{user.name}</h6>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-2 p-2 max-w-40">
        <Button variant={'destructive'} className="w-full gap-2" onClick={handleLogout}>
          <LuLogOut />
          ออกจากระบบ
        </Button>
      </PopoverContent>
    </Popover>
  )
}

export default PopOverProfile
