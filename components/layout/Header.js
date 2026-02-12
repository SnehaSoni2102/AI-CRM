'use client'

import { useState } from 'react'
import { Search, Bell, HelpCircle, Settings, Building2, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BranchSelector from '@/components/shared/BranchSelector'
import { getCurrentUser } from '@/lib/auth'
import { isSuperAdmin } from '@/lib/permissions'

export default function Header({ title, subtitle, onMenuClick }) {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New lead assigned', time: '5 minutes ago', unread: true },
    { id: 2, title: 'Payment received', time: '1 hour ago', unread: true },
    { id: 3, title: 'Class reminder sent', time: '2 hours ago', unread: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)
  const user = getCurrentUser()

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, unread: false } : notif))
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, unread: false })))
  }

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left: Mobile Menu + Title */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="text-base md:text-lg font-semibold text-slate-900">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">{subtitle}</p>}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Branch Selector (Super Admin only) - Hidden on mobile */}
          {isSuperAdmin() && (
            <div className="hidden md:block">
              <BranchSelector />
            </div>
          )}

          {/* Branch Badge (Admin/Staff) - Hidden on mobile */}
          {!isSuperAdmin() && user?.branchName && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
              <Building2 className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">{user.branchName}</span>
            </div>
          )}

          {/* Search - Hidden on mobile, show icon only */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-9 h-9 rounded-full border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-brand" 
            />
          </div>
          
          {/* Search icon for mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-80 z-50 rounded-xl border border-slate-200 bg-white shadow-xl animate-scale-in">
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-slate-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-primary hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-hide">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className="flex items-start gap-2">
                          {notif.unread && (
                            <div className="h-2 w-2 rounded-full bg-brand/100 mt-1.5 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {notif.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 border-t border-slate-200">
                    <button className="w-full text-xs font-medium text-center py-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-600">
                      View all notifications
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Help - Hidden on small mobile */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Settings - Hidden on small mobile */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}


