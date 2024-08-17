// Lib
import React from 'react'

// Images
import { FaSpinner } from 'react-icons/fa6'

type Props = {
  className?: string
}

const LoadingSpinner: React.FC<Props> = ({ className }) => {
  return (
    <div className={`w-full flex flex-col justify-center items-center space-y-4 ${className}`}>
      <h3>
        <FaSpinner className="animate-spin" />
      </h3>
    </div>
  )
}

export default LoadingSpinner
