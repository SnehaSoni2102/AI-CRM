import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn, getInitials, formatDateTime } from '@/lib/utils'

const channels = ['All', 'Email', 'SMS', 'Call']
const contactTypes = ['All', 'Customers', 'Leads', 'Teachers']

export default function ContactList({
  conversations,
  selectedConversation,
  onSelectConversation,
  selectedChannel,
  onChannelChange,
  searchQuery,
  onSearchChange,
  contactFilter,
  onContactFilterChange,
}) {
  return (
    <div className="w-full md:w-80 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm h-full">
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Conversations</h2>
          <Badge variant="info" className="text-xs">{conversations.length}</Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search contacts..."
            className="pl-9 h-9 rounded-lg border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-brand"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters */}
        <Select 
          value={contactFilter} 
          onChange={(e) => onContactFilterChange(e.target.value)}
          className="w-full h-9 rounded-lg border-slate-200 bg-slate-50 text-sm"
        >
          {contactTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      {/* Channel Tabs */}
      <div className="px-3 sm:px-4 py-3 border-b border-slate-200">
        <Tabs value={selectedChannel} onValueChange={onChannelChange}>
          <TabsList className="grid w-full grid-cols-4 bg-slate-100 p-1 rounded-lg">
            {channels.map((channel) => (
              <TabsTrigger 
                key={channel} 
                value={channel} 
                className="text-xs sm:text-sm rounded-md data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm"
              >
                {channel}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No conversations found
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
                className={cn(
                'p-3 border-b border-slate-100 cursor-pointer transition-colors',
                selectedConversation === conv.id 
                  ? 'bg-slate-50 border-l-2 border-l-slate-600' 
                  : 'hover:bg-slate-50'
              )}
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-white shadow-sm">
                  <AvatarFallback className="bg-brand text-white font-semibold">
                    {getInitials(conv.contact.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="font-medium text-sm text-slate-900 truncate">{conv.contact.name}</p>
                    {conv.unread > 0 && (
                      <Badge variant="error" className="h-5 min-w-[20px] px-1.5 text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 truncate mb-1">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {formatDateTime(conv.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-xs border-slate-200 text-slate-600">
                      {conv.channel}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


