'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Phone, Video, Users, Clock } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { appointments } from '@/data/dummyData'
import { filterByBranchAndUser } from '@/lib/branch-filter'
import { getCurrentUser } from '@/lib/auth'
import { cn } from '@/lib/utils'

const appointmentTypeColors = {
  Call: 'bg-slate-600',
  Meeting: 'bg-slate-600',
  Demo: 'bg-slate-600',
  'Follow-up': 'bg-slate-600',
}

const appointmentTypeIcons = {
  Call: Phone,
  Meeting: Users,
  Demo: Video,
  'Follow-up': Clock,
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const user = getCurrentUser()

  // Filter appointments by branch and user (for staff)
  const filters = user?.role === 'staff' ? { assigned_to: user.userId } : {}
  const filteredAppointments = filterByBranchAndUser(appointments, filters)

  // Calendar logic
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1))
  }

  const today = new Date()
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  const toDateKey = (y, m, d) => {
    const date = new Date(y, m, d)
    return date.toISOString().split('T')[0]
  }

  // Get appointments for a specific day
  const getAppointmentsForDay = (day) => {
    const dateStr = toDateKey(year, month, day)
    return filteredAppointments.filter((apt) => apt.date === dateStr)
  }

  // Upcoming appointments
  const upcomingAppointments = filteredAppointments
    .filter((apt) => new Date(apt.date) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  return (
    <MainLayout title="Calendar" subtitle="Schedule and manage appointments">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <CardTitle className="text-base font-semibold text-slate-900">{monthName}</CardTitle>
                <div className="flex items-center gap-2 flex-wrap">
                  <Button variant="outline" size="icon" onClick={prevMonth} className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())} className="text-xs">
                    Today
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth} className="h-9 w-9">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="gradient" size="sm" className="rounded-full text-xs font-semibold">
                    <Plus className="h-3.5 w-3.5 sm:mr-1.5" />
                    <span className="hidden sm:inline">New Event</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* Day headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
                  <div key={day} className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wide py-2">
                    <span className="hidden sm:inline">{day}</span>
                    <span className="sm:hidden">{day.charAt(0)}</span>
                  </div>
                ))}

                {/* Empty cells for days before month starts */}
                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Calendar days */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const dayAppointments = getAppointmentsForDay(day)

                  return (
                    <div
                      key={day}
                      className={cn(
                        'aspect-square border border-slate-200 rounded-lg sm:rounded-xl p-1 sm:p-2 hover:bg-slate-50 transition-colors cursor-pointer',
                        isToday(day) && 'border-2 border-slate-500 bg-slate-50/50'
                      )}
                    >
                      <div
                        className={cn(
                          'text-xs sm:text-sm font-semibold mb-0.5 sm:mb-1',
                          isToday(day) ? 'text-slate-700' : 'text-slate-900'
                        )}
                      >
                        {day}
                      </div>
                      <div className="space-y-0.5 hidden sm:block">
                        {dayAppointments.slice(0, 2).map((apt) => (
                          <div
                            key={apt.id}
                            className={cn(
                              'text-xs px-1.5 py-0.5 rounded-lg text-white truncate shadow-sm',
                              appointmentTypeColors[apt.type]
                            )}
                          >
                            {apt.time}
                          </div>
                        ))}
                        {dayAppointments.length > 2 && (
                          <div className="text-xs text-slate-500 px-1 font-medium">
                            +{dayAppointments.length - 2} more
                          </div>
                        )}
                      </div>
                      {/* Mobile: Show dot indicator */}
                      {dayAppointments.length > 0 && (
                        <div className="sm:hidden flex justify-center mt-0.5">
                          <div className="h-1 w-1 rounded-full bg-slate-600"></div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Appointments */}
        <div>
          <Card className="rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-slate-900">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {upcomingAppointments.map((apt) => {
                  const Icon = appointmentTypeIcons[apt.type]
                  return (
                    <div
                      key={apt.id}
                      className="p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-sm',
                            appointmentTypeColors[apt.type]
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-900">{apt.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{apt.contact}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                              {apt.date}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                              {apt.time}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    No upcoming appointments
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Legend */}
          <Card className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-900">Event Types</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {Object.entries(appointmentTypeColors).map(([type, color]) => {
                  const Icon = appointmentTypeIcons[type]
                  return (
                    <div key={type} className="flex items-center gap-2">
                      <div className={cn('h-3 w-3 rounded', color)} />
                      <Icon className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs text-slate-600">{type}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}


