import { X, Mail, Phone, Calendar, MessageSquare, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { getInitials } from '@/lib/utils'
import { contacts } from '@/data/dummyData'

export default function ContactDetails({ contact, onClose }) {
  const fullContact = contacts.find((c) => c.id === contact.id)

  return (
    <div className="w-80 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50/50">
        <h3 className="text-sm font-semibold text-slate-900">Contact Details</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-slate-100">
          <X className="h-4 w-4 text-slate-600" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
        {/* Profile */}
        <div className="text-center pb-4 border-b border-slate-200">
          <Avatar className="h-16 w-16 mx-auto mb-3 ring-2 ring-white shadow-md">
            <AvatarFallback className="bg-brand text-white text-lg font-semibold">
              {getInitials(contact.name)}
            </AvatarFallback>
          </Avatar>
          <h4 className="font-semibold text-base text-slate-900">{contact.name}</h4>
          <Badge variant="info" className="mt-2 text-xs">
            {contact.type}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 pt-4">
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact Info</h5>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-slate-400" />
            <span className="text-slate-700">{fullContact?.email || '—'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-slate-400" />
            <span className="text-slate-700">{fullContact?.phone || '—'}</span>
          </div>
        </div>

        {/* Lead Info */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Lead Info</h5>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Stage:</span>
            <Badge variant="success" className="text-xs">{contact.stage}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Next Visit:</span>
            <span className="font-medium text-slate-900">{contact.nextVisit}</span>
          </div>
        </div>

        {/* Memberships */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Memberships</h5>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs border-slate-200 text-slate-700">
              Ballet - Premium
            </Badge>
            <Badge variant="outline" className="text-xs border-slate-200 text-slate-700">Jazz - Regular</Badge>
          </div>
        </div>

        {/* Communication Stats */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            Communication History
          </h5>
          <div className="grid grid-cols-3 gap-2">
            <Card className="rounded-lg border border-slate-200 bg-slate-50">
              <CardContent className="p-3 text-center">
                <Mail className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                <p className="text-base font-bold text-slate-900">12</p>
                <p className="text-xs text-slate-500">Emails</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg border border-slate-200 bg-slate-50">
              <CardContent className="p-3 text-center">
                <MessageSquare className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                <p className="text-base font-bold text-slate-900">8</p>
                <p className="text-xs text-slate-500">SMS</p>
              </CardContent>
            </Card>
            <Card className="rounded-lg border border-slate-200 bg-slate-50">
              <CardContent className="p-3 text-center">
                <PhoneCall className="h-4 w-4 mx-auto mb-1 text-slate-600" />
                <p className="text-base font-bold text-slate-900">5</p>
                <p className="text-xs text-slate-500">Calls</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4 border-t border-slate-200">
          <Button variant="gradient" className="w-full rounded-lg text-xs font-semibold">
            <Mail className="h-3.5 w-3.5 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" className="w-full rounded-lg text-xs font-semibold border-slate-200">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            Schedule Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}


