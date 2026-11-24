import {useEffect, useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {Menu, X} from 'lucide-react'

import Logo from '../common/Logo'
import ThemeToggle from '../common/ThemeToggle'
import Button from '../ui/Button'
import {NAV_ITEMS} from '../../config/routes'

const linkClass = ({isActive}) =>
  `rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'bg-primary-soft font-semibold text-primary' : 'text-content-muted hover:text-content'}`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const {pathname} = useLocation()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />

        <nav aria-label="القائمة الرئيسية" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button to="/contact" className="hidden sm:inline-flex">احجز استشارة</Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card text-content lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="القائمة الرئيسية" className="border-t border-border bg-surface px-5 pb-8 pt-4 lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({isActive}) => `block rounded-2xl px-4 py-4 text-base ${isActive ? 'bg-primary-soft font-semibold text-primary' : 'text-content'}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" className="mt-6 w-full" size="lg">احجز استشارة</Button>
        </nav>
      )}
    </header>
  )
}
