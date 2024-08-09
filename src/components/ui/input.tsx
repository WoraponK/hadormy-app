import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ icon, suffix, className, type, ...props }, ref) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          'flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:cursor-pointer placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-200',
          className,
        )}
      />
      {suffix}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
