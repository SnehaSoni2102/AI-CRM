'use client'

import { cn } from '@/lib/utils'

/**
 * Apple-style Loading Spinner Component
 * Provides a smooth, elegant loading animation matching Apple's design language
 */
export default function LoadingSpinner({ 
  size = 'md',
  className = '',
  text = null
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }

  const borderWidthClasses = {
    sm: 'border',
    md: 'border-2',
    lg: 'border-[3px]',
    xl: 'border-4'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className={cn('relative', sizeClasses[size] || sizeClasses.md)}>
        {/* Apple-style circular spinner with smooth animation */}
        <div className={cn('absolute inset-0 rounded-full border-slate-200', borderWidthClasses[size] || borderWidthClasses.md)}></div>
        <div 
          className={cn('absolute inset-0 rounded-full border-brand border-t-transparent', borderWidthClasses[size] || borderWidthClasses.md)}
          style={{
            animation: 'spin 0.8s linear infinite'
          }}
        ></div>
      </div>
      {text && (
        <p className="mt-4 text-sm text-slate-500">{text}</p>
      )}
    </div>
  )
}

/**
 * Apple-style Dot Loading Spinner (alternative style)
 * Three dots that bounce up and down
 */
export function DotSpinner({ 
  size = 'md',
  className = '',
  text = null
}) {
  const dotSizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="flex items-center gap-1.5">
        <div 
          className={cn('rounded-full bg-brand animate-bounce', dotSizeClasses[size] || dotSizeClasses.md)}
          style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
        />
        <div 
          className={cn('rounded-full bg-brand animate-bounce', dotSizeClasses[size] || dotSizeClasses.md)}
          style={{ animationDelay: '160ms', animationDuration: '1.4s' }}
        />
        <div 
          className={cn('rounded-full bg-brand animate-bounce', dotSizeClasses[size] || dotSizeClasses.md)}
          style={{ animationDelay: '320ms', animationDuration: '1.4s' }}
        />
      </div>
      {text && (
        <p className="mt-4 text-sm text-slate-500">{text}</p>
      )}
    </div>
  )
}
