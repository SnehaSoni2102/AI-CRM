'use client'

import { useState } from 'react'
import { Search, Mail, Phone, MessageSquare, MoreHorizontal, Plus } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { leads } from '@/data/dummyData'
import { filterByBranch } from '@/lib/branch-filter'
import { formatDate, formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

const statusColors = {
  New: 'badge-info',
  Contacted: 'badge-warning',
  Qualified: 'badge-success',
  Proposal: 'text-slate-700 bg-slate-100 border-slate-200',
  Negotiation: 'text-slate-700 bg-slate-100 border-slate-200',
}

const healthColors = {
  Cold: 'badge-info',
  Contacted: 'badge-warning',
  Converted: 'badge-success',
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedLeads, setSelectedLeads] = useState([])

  // Filter leads by branch
  const filteredLeads = filterByBranch(leads)

  // Apply search and status filter
  const displayedLeads = filteredLeads.filter((lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleLead = (leadId) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId) ? prev.filter((id) => id !== leadId) : [...prev, leadId]
    )
  }

  const toggleAll = () => {
    if (selectedLeads.length === displayedLeads.length) {
      setSelectedLeads([])
    } else {
      setSelectedLeads(displayedLeads.map((l) => l.id))
    }
  }

  return (
    <MainLayout title="Leads" subtitle="Manage and track all your leads">
      <div className="space-y-4 md:space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
          <div className="relative flex-1 max-w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-48">
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
          </Select>
          <Button variant="gradient" className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedLeads.length > 0 && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-slide-up shadow-sm">
            <span className="text-sm font-semibold text-slate-900">
              {selectedLeads.length} lead(s) selected
            </span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Mail className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Send Email</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <MessageSquare className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Send SMS</span>
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                Change Status
              </Button>
            </div>
          </div>
        )}

        {/* Leads Table - Tablet/Desktop */}
        <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm animate-fade-in overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLeads.length === displayedLeads.length && displayedLeads.length > 0}
                      onClick={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Communication</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {displayedLeads.map((lead, index) => (
                <TableRow
                  key={lead.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.03}s` }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedLeads.includes(lead.id)}
                      onClick={() => toggleLead(lead.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.source}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{lead.email}</p>
                      <p className="text-muted-foreground">{lead.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={healthColors[lead.health]}>{lead.health}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{formatCurrency(lead.value)}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {lead.calls > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Phone className="h-3 w-3 mr-1" />
                          {lead.calls}
                        </Badge>
                      )}
                      {lead.emails > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.emails}
                        </Badge>
                      )}
                      {lead.sms > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {lead.sms}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(lead.createdAt)}</p>
                      {lead.lastContactedAt && (
                        <p className="text-xs text-muted-foreground">
                          Last: {formatDate(lead.lastContactedAt)}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
          </div>
        </div>

        {/* Leads Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {displayedLeads.map((lead, index) => (
            <div
              key={lead.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <Checkbox
                    checked={selectedLeads.includes(lead.id)}
                    onClick={() => toggleLead(lead.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 mb-1">{lead.name}</p>
                    <p className="text-sm text-slate-600 mb-0.5 truncate">{lead.email}</p>
                    <p className="text-sm text-slate-600 truncate">{lead.phone}</p>
                    <p className="text-xs text-slate-500 mt-1">{lead.source}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={statusColors[lead.status]}>{lead.status}</Badge>
                <Badge className={healthColors[lead.health]}>{lead.health}</Badge>
                <span className="font-medium text-slate-900">{formatCurrency(lead.value)}</span>
              </div>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {lead.calls > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Phone className="h-3 w-3 mr-1" />
                    {lead.calls}
                  </Badge>
                )}
                {lead.emails > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Mail className="h-3 w-3 mr-1" />
                    {lead.emails}
                  </Badge>
                )}
                {lead.sms > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {lead.sms}
                  </Badge>
                )}
              </div>

              <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                <p>Created: {formatDate(lead.createdAt)}</p>
                {lead.lastContactedAt && (
                  <p>Last contacted: {formatDate(lead.lastContactedAt)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}


