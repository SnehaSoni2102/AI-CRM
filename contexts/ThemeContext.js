'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  mounted: false,
})

function getThemeFromDocument() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setThemeState(getThemeFromDocument())
  }, [])

  const setTheme = useCallback((value) => {
    const next = value === 'dark' ? 'dark' : 'light'
    setThemeState(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle('dark', next === 'dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
