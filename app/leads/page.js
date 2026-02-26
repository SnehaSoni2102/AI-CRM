'use client'

import { useState } from 'react'
import { Search, Plus, ChevronDown, SlidersHorizontal, Phone, Mail, MessageSquare, MoreHorizontal, X } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

const MOCK_LEADS = [
  { id: '1', name: 'Liam Jones', subtitle: 'Meeting', email: 'liam.jones@example.com', phone: '512-123-4557', status: 'Negotiation', health: 'Cold', value: 300, calls: 1, emails: 2, chats: 25, created: 'Feb 12, 2025', lastActive: 'Feb 10, 2025', avatar: null },
  { id: '2', name: 'Sophia Chen', subtitle: 'Conference', email: 'liam.jones@example.com', phone: '415-987-6543', status: 'Negotiation', health: 'Cold', value: 1200, calls: 0, emails: 5, chats: 40, created: 'Mar 5, 2025', lastActive: 'Mar 3, 2025', avatar: null },
  { id: '3', name: 'Ethan Smith', subtitle: 'Workshop', email: 'liam.jones@example.com', phone: '303-555-7890', status: 'Negotiation', health: 'Cold', value: 800, calls: 2, emails: 5, chats: 30, created: 'Apr 15, 2025', lastActive: 'Apr 12, 2025', avatar: null },
  { id: '4', name: 'Ava Brown', subtitle: 'Seminar', email: 'liam.jones@example.com', phone: '202-555-1234', status: 'Qualified', health: 'Proposal', value: 450, calls: 3, emails: 2, chats: 28, created: 'May 9, 2025', lastActive: 'May 6, 2025', avatar: null },
  { id: '5', name: 'Mason Lee', subtitle: 'Panel Discussion', email: 'liam.jones@example.com', phone: '404-555-9988', status: 'Negotiation', health: 'Cold', value: 900, calls: 0, emails: 8, chats: 22, created: 'Jun 21, 2025', lastActive: 'Jun 18, 2025', avatar: null },
  { id: '6', name: 'Isabela Davis', subtitle: 'Session', email: 'isabella.is@mail.com', phone: '303-555-5678', status: 'Qualified', health: 'Cold', value: 250, calls: 1, emails: 2, chats: 29, created: 'Jul 30, 2025', lastActive: 'Jul 27, 2025', avatar: null },
  { id: '7', name: 'Noah Wilson', subtitle: 'Feedback Meeting', email: 'noah.wilson@gmail.com', phone: '505-555-4321', status: 'Negotiation', health: 'Cold', value: 600, calls: 2, emails: 8, chats: 36, created: 'Aug 14, 2025', lastActive: 'Aug 11, 2025', avatar: null },
  { id: '8', name: 'Liam Jones', subtitle: 'Meeting', email: 'liam.jones@example.com', phone: '512-123-4567', status: 'Negotiation', health: 'Cold', value: 300, calls: 1, emails: 2, chats: 26, created: 'Feb 12, 2025', lastActive: 'Feb 10, 2025', avatar: null },
  { id: '9', name: 'Mason Lee', subtitle: 'Panel Discussion', email: 'liam.jones@example.com', phone: '404-555-9988', status: 'Negotiation', health: 'Cold', value: 900, calls: 0, emails: 6, chats: 22, created: 'Jun 21, 2025', lastActive: 'Jun 18, 2025', avatar: null },
  { id: '10', name: 'Ethan Smith', subtitle: 'Workshop', email: 'liam.jones@example.com', phone: '303-555-7890', status: 'Negotiation', health: 'Cold', value: 800, calls: 2, emails: 4, chats: 30, created: 'Apr 15, 2025', lastActive: 'Apr 12, 2025', avatar: null },
]

const STATUS_STYLES = {
  Negotiation: 'bg-[#9224EF] text-white',
  Qualified: 'bg-emerald-500 text-white',
}

const HEALTH_STYLES = {
  Cold: 'bg-amber-500/90 text-white',
  Proposal: 'bg-slate-400 text-white',
}

const ROWS_PER_PAGE = 10
const TOTAL_PAGES = 10

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLeads = searchQuery
    ? MOCK_LEADS.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : MOCK_LEADS

  const toggleOne = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleAll = () => {
    if (selectedIds.length === filteredLeads.length) setSelectedIds([])
    else setSelectedIds(filteredLeads.map((l) => l.id))
  }

  return (
    <MainLayout title="Leads" subtitle="">
      <div className="max-w-[1204px] mx-auto">
        {/* Title + count + description */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold text-[#050312] tracking-tight">Leads</h1>
            <span className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium text-[#9224EF] bg-white border border-[#E2E8F0]">
              100 users
            </span>
          </div>
          <p className="text-sm font-normal text-[#64748B]">
            Manage your team members and their account permissions here.
          </p>
        </div>

        {/* Search + filter bar — Search left, everything else right */}
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* Left: Search */}
          <div className="relative w-[220px] shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#94A3B8]" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 rounded-lg border-[#E2E8F0] bg-white text-sm placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Right: all filter controls */}
          <div className="flex items-center gap-2">
            {/* Active filter pills */}
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[#9224EF] text-white text-sm font-medium shrink-0"
            >
              All Status <X className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-[#9224EF] text-white text-sm font-medium shrink-0"
            >
              Sort A-Z <X className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#334155] hover:bg-slate-50 shrink-0"
            >
              <SlidersHorizontal className="h-4 w-4 text-[#64748B]" />
              More filters
            </button>
            <Button
              className="h-9 px-4 rounded-lg bg-[#9224EF] hover:bg-[#7B1FD4] text-white text-sm font-medium gap-2 shrink-0"
              onClick={() => {}}
            >
              <Plus className="h-4 w-4" />
              Add Leads
            </Button>
            <button
              type="button"
              className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#334155] hover:bg-slate-50 shrink-0"
            >
              Status <ChevronDown className="h-4 w-4 text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E2E8F0] hover:bg-transparent bg-[#F8FAFC]">
                <TableHead className="w-12 py-3 pl-4 pr-0">
                  <Checkbox
                    checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
                    onClick={toggleAll}
                    className="rounded border-[#CBD5E1] data-[state=checked]:bg-[#9224EF] data-[state=checked]:border-[#9224EF]"
                  />
                </TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Name</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Contact</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Status</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Health</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Value</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Communication</TableHead>
                <TableHead className="py-3 px-4 text-xs font-medium text-[#64748B]">Created</TableHead>
                <TableHead className="w-12 py-3 pr-4 pl-0" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="border-b border-[#E2E8F0] hover:bg-slate-50/80 transition-colors"
                >
                  <TableCell className="py-3 pl-4 pr-0">
                    <Checkbox
                      checked={selectedIds.includes(lead.id)}
                      onClick={() => toggleOne(lead.id)}
                      className="rounded border-[#CBD5E1] data-[state=checked]:bg-[#9224EF] data-[state=checked]:border-[#9224EF]"
                    />
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-sm font-medium text-[#64748B] shrink-0">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-normal text-[#050312] leading-tight">{lead.name}</p>
                        {lead.subtitle && (
                          <p className="text-xs font-normal text-[#94A3B8] leading-tight mt-0.5">
                            {lead.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="text-sm font-normal text-[#050312] leading-tight">{lead.email}</div>
                    <div className="text-xs font-normal text-[#94A3B8] leading-tight">{lead.phone}</div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        STATUS_STYLES[lead.status] ?? 'bg-slate-200 text-slate-700'
                      )}
                    >
                      {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        HEALTH_STYLES[lead.health] ?? 'bg-slate-200 text-slate-700'
                      )}
                    >
                      {lead.health}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <span className="text-sm font-normal text-[#050312]">
                      ${lead.value.toFixed(2)}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="flex items-center gap-3 text-sm text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {lead.calls}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        {lead.emails}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {lead.chats}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <p className="text-sm font-normal text-[#050312] leading-tight">{lead.created}</p>
                    <p className="text-xs font-normal text-[#94A3B8] leading-tight">
                      Last: {lead.lastActive}
                    </p>
                  </TableCell>
                  <TableCell className="py-3 pr-4 pl-0">
                    <button
                      type="button"
                      className="p-1.5 rounded-md hover:bg-slate-100 text-[#64748B] hover:text-[#334155]"
                      aria-label="Actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center h-8 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#334155] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-[#64748B]">
              Page {currentPage} of {TOTAL_PAGES}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1))}
              disabled={currentPage === TOTAL_PAGES}
              className="inline-flex items-center h-8 px-3 rounded-lg border border-[#E2E8F0] bg-white text-sm font-medium text-[#334155] hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}