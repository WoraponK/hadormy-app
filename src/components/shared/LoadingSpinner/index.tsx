// Lib
import React from 'react'

// Images
import { ImSpinner3 } from 'react-icons/im'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center text-primary space-y-4">
      <h1>
        <ImSpinner3 className="animate-spin" />
      </h1>
      <h3>กำลังโหลด...</h3>
    </div>
  )
}

export default LoadingSpinner
