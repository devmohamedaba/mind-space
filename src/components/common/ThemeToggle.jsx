import {Moon, Sun} from 'lucide-react'

import useTheme from '../../hooks/useTheme'

export default function ThemeToggle() {
  const {theme, toggle} = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'التبديل إلى الوضع الفاتح' : 'التبديل إلى الوضع الداكن'}
      aria-pressed={dark}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card text-content transition-colors hover:bg-primary-soft"
    >
      {dark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  )
}
