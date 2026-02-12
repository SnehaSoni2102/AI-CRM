import { useState } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('')
  const [channel, setChannel] = useState('Email')

  const handleSend = () => {
    if (!message.trim()) return

    onSendMessage?.({ content: message, channel })
    setMessage('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-slate-200 p-3 sm:p-4 space-y-3 bg-white">
      {/* Channel Selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">Send via:</span>
        <Select 
          value={channel} 
          onChange={(e) => setChannel(e.target.value)} 
          className="w-full sm:w-32 h-8 rounded-lg border-slate-200 bg-slate-50 text-xs"
        >
          <option value="Email">📧 Email</option>
          <option value="SMS">💬 SMS</option>
          <option value="Call">📞 Call</option>
        </Select>
      </div>

      {/* Message Input */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="min-h-[60px] sm:min-h-[80px] resize-none pr-16 sm:pr-20 rounded-lg border-slate-200 bg-slate-50 focus:bg-white focus:border-brand text-sm"
          />
          <div className="absolute bottom-2 right-2 flex gap-0.5 sm:gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-slate-100">
              <Paperclip className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-slate-100">
              <Smile className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-500" />
            </Button>
          </div>
        </div>
        <Button 
          onClick={handleSend} 
          size="icon" 
          variant="gradient" 
          className="h-[60px] sm:h-[80px] w-10 sm:w-12 rounded-lg shadow-sm hover:shadow-md flex-shrink-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {channel === 'SMS' && (
        <p className="text-xs text-slate-500">
          Character count: <span className={cn('font-medium', message.length > 160 && 'text-red-600')}>{message.length}/160</span>
        </p>
      )}
    </div>
  )
}


