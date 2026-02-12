'use client'

import { useState } from 'react'
import { MessageSquare, X, Send, Sparkles, Clock, HelpCircle, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const quickActions = [
  'Show my appointments',
  'Create new lead',
  'Send follow-up email',
  'View reports',
]

const recentChats = [
  { id: '1', title: 'How to add a new lead?', time: '2 hours ago', preview: 'You can add a new lead by...' },
  { id: '2', title: 'Calendar sync issue', time: 'Yesterday', preview: 'To sync your calendar...' },
  { id: '3', title: 'Email template question', time: '2 days ago', preview: 'Email templates can be...' },
]

const helpTopics = [
  { title: 'Getting Started', icon: '🚀', description: 'Learn the basics of using the CRM' },
  { title: 'Managing Leads', icon: '👥', description: 'Track and convert your leads' },
  { title: 'Email Campaigns', icon: '📧', description: 'Create and send email campaigns' },
  { title: 'Workflows', icon: '⚙️', description: 'Automate your processes' },
]

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: '1', sender: 'bot', content: 'Hi! I\'m your AI assistant. How can I help you today?' },
  ])

  const handleSend = (contentOverride) => {
    const content = (contentOverride ?? message).trim()
    if (!content) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content,
    }
    setMessages([...messages, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: 'I understand you need help with that. Let me assist you...',
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setMessage('')
  }

  const handleQuickAction = (action) => {
    handleSend(action)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-brand text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 z-50 flex items-center justify-center ring-4 ring-white/20"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    )
  }

  return (
    <div
      className={cn(
        'fixed z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl transition-all animate-scale-in',
        // Mobile: Full screen on small devices
        'inset-4 sm:inset-auto sm:bottom-6 sm:right-6',
        // Desktop: Fixed size
        isMinimized 
          ? 'sm:w-80 h-16' 
          : 'sm:w-96 h-[calc(100vh-2rem)] sm:h-[600px]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-200 bg-brand text-white rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400" />
              <span className="text-xs opacity-90">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex h-8 w-8 text-white hover:bg-white/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 sm:h-8 sm:w-8 text-white hover:bg-white/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-[calc(100%-56px)] sm:h-[calc(100%-64px)]">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="chat" className="flex-1 text-xs sm:text-sm">Chat</TabsTrigger>
            <TabsTrigger value="recent" className="flex-1 text-xs sm:text-sm">Recent</TabsTrigger>
            <TabsTrigger value="help" className="flex-1 text-xs sm:text-sm">Help</TabsTrigger>
          </TabsList>

          {/* Chat Tab */}
          <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-0 data-[state=active]:flex">
            <div className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 space-y-3 sm:space-y-4">
              {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex',
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-xl px-3 py-2 shadow-sm',
                        msg.sender === 'user'
                          ? 'bg-brand text-white'
                          : 'bg-slate-100 text-slate-900 border border-slate-200'
                      )}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
              ))}
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-3 sm:p-4 border-t space-y-2">
                <p className="text-xs text-muted-foreground font-medium mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-2.5 sm:px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors font-medium"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="min-h-[40px] max-h-[100px] resize-none rounded-lg border-slate-200 bg-slate-50 focus:bg-white focus:border-brand text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  variant="gradient"
                  className="shrink-0 rounded-lg shadow-sm hover:shadow-md"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Recent Tab */}
          <TabsContent value="recent" className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 space-y-3 m-0">
              {recentChats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-sm text-slate-900">{chat.title}</p>
                    <Clock className="h-3 w-3 text-slate-400 shrink-0 mt-0.5" />
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{chat.preview}</p>
                  <p className="text-xs text-slate-400">{chat.time}</p>
                </div>
              ))}
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help" className="flex-1 overflow-y-auto scrollbar-hide p-3 sm:p-4 space-y-4 m-0">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">What I can do:</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Answer questions about CRM features</p>
                <p>• Help you navigate the system</p>
                <p>• Create tasks and reminders</p>
                <p>• Generate reports and insights</p>
                <p>• Assist with workflows and automation</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Help Topics:</h4>
              <div className="space-y-2">
                {helpTopics.map((topic) => (
                  <div
                    key={topic.title}
                    className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{topic.icon}</span>
                      <div>
                        <p className="font-medium text-sm text-slate-900">{topic.title}</p>
                        <p className="text-xs text-slate-500">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <HelpCircle className="h-4 w-4 mr-2" />
              View Full Documentation
            </Button>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

