import * as React from 'react'

import { cn } from '@/lib/utils'
import { Input } from './input'

import { FiEyeOff, FiEye } from 'react-icons/fi'

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      suffix={
        showPassword ? (
          <FiEye onClick={() => setShowPassword(false)} className="text-xl cursor-pointer" />
        ) : (
          <FiEyeOff onClick={() => setShowPassword(true)} className="text-xl cursor-pointer" />
        )
      }
      className={className}
      {...props}
      ref={ref}
    />
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
