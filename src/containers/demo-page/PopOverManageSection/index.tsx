// Lib
import React from 'react'

// Include in project
import { PopOverManage } from '@/components/shared'

const PopOverManageSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">PopOverManage</h2>
      <h6>
        The <span className="text-primary">PopOverManage</span> have no props.
      </h6>
      <div className="bg-foreground rounded-lg p-4 flex justify-center items-center">
        <PopOverManage role="ADMIN" dormId="123" />
        <PopOverManage role="SUPERUSER" dormId="456" isCreated />
        <PopOverManage role="SUPERUSER" dormId="789" />
      </div>
    </div>
  )
}

export default PopOverManageSection
