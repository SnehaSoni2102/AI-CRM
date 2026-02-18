'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Reusable Styled Select Component
 * Provides a modern dropdown that matches the styling of StatusSelector, RoleSelector, etc.
 */
export default function StyledSelect({ 
  value, 
  onChange, 
  options = [],
  placeholder = 'Select...',
  className = ''
}) {
  const [open, setOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  // Handle both array of strings and array of objects
  const normalizedOptions = options.map(opt => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    return opt
  })

  const selectedOption = normalizedOptions.find(opt => opt.value === value)

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
          <span className={cn('truncate', !selectedOption && 'text-slate-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
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
            className="fixed z-30 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto overflow-x-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {normalizedOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-center text-slate-500">
                No options available
              </div>
            ) : (
              normalizedOptions.map((option) => {
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
                      isSelected && 'bg-brand/10 text-brand font-medium'
                    )}
                  >
                    <span className={cn('truncate', isSelected && 'text-brand')}>{option.label}</span>
                  </button>
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  )
}
