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
          'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border',
          'bg-background text-sm text-foreground hover:border-muted-foreground/30 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
          open && 'border-brand ring-2 ring-brand ring-offset-1 ring-offset-background'
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className={cn('truncate', !selectedOption && 'text-muted-foreground')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setOpen(false)}
          />
          <div 
            ref={dropdownRef}
            className="fixed z-30 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto overflow-x-hidden"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`
            }}
          >
            {normalizedOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-center text-muted-foreground">
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
                      'hover:bg-muted',
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
