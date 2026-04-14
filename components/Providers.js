'use client'

import { Toaster } from 'sonner'
import { InboxHeaderProvider } from '@/contexts/InboxHeaderContext'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

function ThemedToaster() {
  const { theme, mounted } = useTheme()
  return (
    <Toaster
      position="top-right"
      richColors
      theme={mounted ? theme : 'light'}
    />
  )
}

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <InboxHeaderProvider>
        {children}
        <ThemedToaster />
      </InboxHeaderProvider>
    </ThemeProvider>
  )
}

