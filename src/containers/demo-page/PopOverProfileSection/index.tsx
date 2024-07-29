// Lib
import React from 'react'

// Include in project
import { PopOverProfile } from '@/components/shared'
import { TUser } from '@/lib/type'

const PopOverProfileSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">PopOverProfile</h2>
      <h6>
        The <span className="text-primary">PopOverProfile</span> have no props.
      </h6>
      <div className="bg-foreground rounded-lg p-4 flex justify-center items-center">
        <PopOverProfile user={mockupUserData1} />
        <PopOverProfile user={mockupUserData2} />
      </div>
    </div>
  )
}

export default PopOverProfileSection

const mockupUserData1: TUser = {
  id: '1',
  name: 'วรพล กลับศรีฟหกดหกดฟหกดฟหกดหฟกด',
  email: ' worapon.klabsri@gmail.com',
  phoneNumber: '0630913505',
  role: 'ADMIN',
}

const mockupUserData2: TUser = {
  id: '2',
  name: 'Wงลม',
  email: ' worapon.klabsri@gmail.com',
  phoneNumber: '0630913505',
  role: 'USER',
}
