'use client'

import { useState, useEffect, useRef } from 'react'
import { UserCog, ChevronDown } from 'lucide-react'
import api from '@/lib/api'
import { cn } from '@/lib/utils'

/**
 * Reusable Role Selector Component
 * Fetches roles from API and provides a dropdown selector
 */
export default function RoleSelector({ 
  value, 
  onChange, 
  placeholder = 'Select role...',
  className = ''
}) {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 })
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    loadRoles()
  }, [])

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

  async function loadRoles() {
    try {
      setLoading(true)
      // Fetch all roles with a high limit to get all roles for dropdown
      const result = await api.get('/api/role?limit=1000')
      if (result.success) {
        const rolesData = result.data || []
        setRoles(rolesData)
      }
    } catch (e) {
      console.error('Failed to load roles:', e)
    } finally {
      setLoading(false)
    }
  }

  const selectedRole = roles.find(role => role.role === value)

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
        disabled={loading}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <UserCog className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className={cn('truncate', !selectedRole && 'text-muted-foreground')}>
            {loading 
              ? 'Loading...' 
              : selectedRole 
                ? selectedRole.role 
                : placeholder}
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
            {roles.length === 0 ? (
              <div className="px-3 py-4 text-sm text-center text-muted-foreground">
                {loading ? 'Loading roles...' : 'No roles available'}
              </div>
            ) : (
              roles.map((role) => (
                <button
                  key={role._id}
                  type="button"
                  onClick={() => {
                    onChange(role.role)
                    setOpen(false)
                  }}
                  className={cn(
                    'w-full flex items-start gap-2 px-3 py-2 text-sm text-left hover:bg-muted transition-colors',
                    value === role.role && 'bg-brand/10 text-brand font-medium'
                  )}
                >
                  <UserCog className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{role.role}</div>
                  </div>
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}
