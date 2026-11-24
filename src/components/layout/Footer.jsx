import {Link} from 'react-router-dom'
import {Mail, MessageCircle, Clock} from 'lucide-react'

import Logo from '../common/Logo'
import siteConfig from '../../config/siteConfig'
import {NAV_ITEMS} from '../../config/routes'

export default function Footer() {
  const c = siteConfig.contact
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-8 text-content-muted">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="روابط التذييل">
          <h2 className="mb-5 text-base text-content">روابط سريعة</h2>
          <ul className="space-y-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-content-muted transition-colors hover:text-primary">{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-5 text-base text-content">تواصل معنا</h2>
          <ul className="space-y-4 text-content-muted">
            <li className="flex items-center gap-3"><MessageCircle size={18} className="text-primary" aria-hidden="true" /><a href={`https://wa.me/${c.whatsapp}`} className="hover:text-primary">واتساب: <span dir="ltr">{c.phoneDisplay}</span></a></li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-primary" aria-hidden="true" /><a href={`mailto:${c.email}`} className="hover:text-primary">{c.email}</a></li>
            <li className="flex items-start gap-3"><Clock size={18} className="mt-1.5 shrink-0 text-primary" aria-hidden="true" /><span>{c.hours}</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl space-y-2 px-5 py-8 text-sm leading-7 text-content-muted sm:px-8">
          <p>مساحة نفسية ليست خدمة طوارئ. إذا كنت في خطر فوري فتواصل مع خدمات الطوارئ في بلدك أو مع شخص تثق به.</p>
          <p>© {year} {siteConfig.name}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
