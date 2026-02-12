import { Info, MoreVertical, Phone, Video, Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials, formatDateTime } from '@/lib/utils'
import MessageInput from './MessageInput'
import { cn } from '@/lib/utils'

export default function ConversationView({
  conversation,
  messages,
  onToggleDetails,
  showDetails,
  onSendMessage,
  onBackClick,
}) {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="text-center">
          <Mail className="h-16 w-16 mx-auto text-slate-300 mb-4" />
          <h3 className="text-base font-semibold text-slate-900 mb-2">No Conversation Selected</h3>
          <p className="text-sm text-slate-500">
            Select a conversation from the list to view messages
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-slate-200 bg-slate-50/50 flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          {/* Back button for mobile */}
          {onBackClick && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onBackClick} 
              className="lg:hidden h-8 w-8 flex-shrink-0"
            >
              <ArrowLeft className="h-4 w-4 text-slate-600" />
            </Button>
          )}
          <Avatar className="h-9 w-9 md:h-10 md:w-10 ring-2 ring-white shadow-sm flex-shrink-0">
            <AvatarFallback className="bg-brand text-white font-semibold text-sm">
              {getInitials(conversation.contact.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-slate-900 truncate">{conversation.contact.name}</h3>
            <p className="text-xs text-slate-500 truncate">{conversation.contact.type}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 md:gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 hidden sm:flex">
            <Phone className="h-4 w-4 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 hidden sm:flex">
            <Video className="h-4 w-4 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleDetails} className="h-8 w-8 hover:bg-slate-100 hidden lg:flex">
            <Info className="h-4 w-4 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
            <MoreVertical className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide p-3 md:p-4 space-y-2 md:space-y-3 bg-slate-50/30">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-12">
            No messages yet. Start a conversation!
          </div>
        ) : (
          messages.map((message) => {
            const isInbound = message.direction === 'inbound'
            return (
              <div
                key={message.id}
                className={cn('flex animate-fade-in', isInbound ? 'justify-start' : 'justify-end')}
              >
                <div className={cn('flex gap-2 max-w-[85%] sm:max-w-[75%]', !isInbound && 'flex-row-reverse')}>
                  <Avatar className="h-6 w-6 sm:h-7 sm:w-7 ring-2 ring-white flex-shrink-0">
                    <AvatarFallback
                      className={cn(
                        'text-xs font-semibold',
                        isInbound
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-brand text-white'
                      )}
                    >
                      {getInitials(message.sender)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        'rounded-xl px-3 py-2 shadow-sm break-words',
                        isInbound
                          ? 'bg-white border border-slate-200 text-slate-900'
                          : 'bg-brand text-white'
                      )}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 px-2">
                      {formatDateTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  )
}


