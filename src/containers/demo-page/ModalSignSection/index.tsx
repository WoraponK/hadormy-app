// Lib
import React from 'react'

// Include in project
import { ModalSign } from '@/components/shared'

const ModalSignSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="break-words">ModalSign</h2>
      <h6>
        The <span className="text-primary">ModalSign</span> have no props.
      </h6>
      <div className="bg-background rounded-lg p-4 flex justify-center items-center">
        <ModalSign />
      </div>
    </div>
  )
}

export default ModalSignSection
