// Lib
import React from 'react'

// Images
import { FaSpinner } from 'react-icons/fa6'

type Props = {
  className?: string
  size?: 'sm' | 'md'
}

const LoadingSpinner: React.FC<Props> = ({ className, size = 'md' }) => {
  return (
    <div className={`w-full flex flex-col justify-center items-center space-y-4 ${className}`}>
      <h3 className={`${size === 'sm' && 'text-sm'}`}>
        <FaSpinner className="animate-spin" />
      </h3>
    </div>
  )
}

export default LoadingSpinner
