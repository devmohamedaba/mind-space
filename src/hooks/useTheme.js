// src/hooks/useTheme.js
import {useCallback, useEffect, useState} from 'react'

const KEY = 'ms-theme'

function readInitial() {
  try {
    const stored = window.localStorage.getItem(KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* التخزين غير متاح (وضع خاص) */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function useTheme() {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#121916' : '#2F5044')
    try {
      window.localStorage.setItem(KEY, theme)
    } catch {
      /* تجاهل */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return {theme, toggle}
}
