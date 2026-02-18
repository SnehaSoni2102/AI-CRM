'use client'

import { useState, useRef, useEffect } from 'react'
import { CheckCircle2, XCircle, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Reusable Status Selector Component
 * Provides a styled dropdown for selecting user status (Active/Inactive)
 */
export default function StatusSelector({ 
  value, 
  onChange, 
  placeholder = 'Select status...',
  className = ''
}) {
  const [open, setOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const statusOptions = [
    { value: 'active', label: 'Active', icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-50' },
    { value: 'inactive', label: 'Inactive', icon: XCircle, color: 'text-red-600', bgColor: 'bg-red-50' }
  ]

  const selectedStatus = statusOptions.find(opt => opt.value === value)

  useEffect(() => {
    if (open && buttonRef.current) {
      const updatePosition = () => {
        if (buttonRef.current) {
          const buttonRect = buttonRef.current.getBoundingClientRect()
          setDropdownPosition({
            top: buttonRect.bottom + 4,
            left: buttonRect.left,
            width: buttonRect.width
          })
        }
      }
      
      updatePosition()
      
      // Update position on scroll or resize
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    }
  }, [open])

  return (
    <div className={cn('relative', className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200',
          'bg-white text-sm text-slate-900 hover:border-slate-300 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1',
          open && 'border-brand ring-2 ring-brand ring-offset-1'
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedStatus ? (
            <>
              <selectedStatus.icon className={cn('h-4 w-4 shrink-0', selectedStatus.color)} />
              <span className="truncate">{selectedStatus.label}</span>
            </>
          ) : (
            <span className="text-slate-400 truncate">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={cn('h-4 w-4 text-slate-400 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpen(false)}
          />
          <div 
            ref={dropdownRef}
            className="fixed z-30 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {statusOptions.map((option) => {
              const Icon = option.icon
              const isSelected = value === option.value
              
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-colors',
                    'hover:bg-slate-50',
                    isSelected && `${option.bgColor} ${option.color} font-medium`
                  )}
                >
                  <Icon className={cn('h-4 w-4 shrink-0', isSelected ? option.color : 'text-slate-400')} />
                  <span className={cn(isSelected && option.color)}>{option.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
