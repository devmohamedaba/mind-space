import {useState} from 'react'
import {Clock, Mail, MapPin, MessageCircle} from 'lucide-react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import siteConfig from '../config/siteConfig'
import {SEO_PAGES} from '../config/seoPages'

const TOPICS = ['استشارة فردية', 'استشارة أسرية أو زوجية', 'مراهق أو طفل', 'استفسار عام']
const field = 'mt-2 w-full rounded-2xl border border-border bg-surface px-5 py-3.5 text-base text-content placeholder:text-content-muted/70 focus:border-primary'

export default function Contact() {
  const page = SEO_PAGES[5]
  const c = siteConfig.contact
  const [form, setForm] = useState({name: '', topic: TOPICS[0], message: ''})
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({...f, [k]: e.target.value}))

  const text = () => `السلام عليكم، أنا ${form.name.trim()}.\nالموضوع: ${form.topic}\n${form.message.trim()}`

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'اكتب اسمك من فضلك.'
    if (form.message.trim().length < 5) next.message = 'اكتب رسالتك باختصار.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const sendWhatsApp = (e) => {
    e.preventDefault()
    if (!validate()) return
    window.open(`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(text())}`, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = () => {
    if (!validate()) return
    window.location.href = `mailto:${c.email}?subject=${encodeURIComponent(`${form.topic} — ${form.name.trim()}`)}&body=${encodeURIComponent(text())}`
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'تواصل معنا',
    url: `${siteConfig.url}/contact`,
    inLanguage: 'ar',
  }

  return (
    <>
      <Seo title={page.title} description={page.description} path="/contact" jsonLd={jsonLd} />
      <section className="bg-surface-alt pb-6 pt-16 sm:pt-24">
        <Container>
          <SectionTitle as="h1" eyebrow="تواصل معنا" title="يسعدنا أن نسمعك" subtitle="اكتب لنا بإيجاز عمّا يشغلك. لا تحتاج إلى شرح كل شيء الآن." />
        </Container>
      </section>

      <Section tone="alt" className="!pt-8">
        <Container className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Card className="p-8 sm:p-10 lg:col-span-3">
            <form onSubmit={sendWhatsApp} noValidate>
              <div>
                <label htmlFor="name" className="font-medium text-content">الاسم</label>
                <input id="name" name="name" autoComplete="name" value={form.name} onChange={set('name')} className={field} placeholder="كيف نناديك؟" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-err' : undefined} />
                {errors.name && <p id="name-err" role="alert" className="mt-2 text-sm text-error">{errors.name}</p>}
              </div>

              <div className="mt-7">
                <label htmlFor="topic" className="font-medium text-content">موضوع الرسالة</label>
                <select id="topic" name="topic" value={form.topic} onChange={set('topic')} className={field}>
                  {TOPICS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="mt-7">
                <label htmlFor="message" className="font-medium text-content">رسالتك</label>
                <textarea id="message" name="message" rows={6} value={form.message} onChange={set('message')} className={field} placeholder="اكتب ما تودّ أن نعرفه…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'msg-err' : undefined} />
                {errors.message && <p id="msg-err" role="alert" className="mt-2 text-sm text-error">{errors.message}</p>}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button type="submit" size="lg"><MessageCircle size={20} aria-hidden="true" /> أرسل عبر واتساب</Button>
                <Button type="button" variant="outline" size="lg" onClick={sendEmail}><Mail size={20} aria-hidden="true" /> أرسل بالبريد</Button>
              </div>
              <p className="mt-6 text-sm leading-8 text-content-muted">
                عند الضغط يُفتح تطبيق واتساب أو بريدك برسالة جاهزة. لا نحفظ بياناتك على هذا الموقع.
              </p>
            </form>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            {[
              {icon: MessageCircle, title: 'واتساب', body: <a href={`https://wa.me/${c.whatsapp}`} className="text-primary hover:underline" dir="ltr">{c.phoneDisplay}</a>},
              {icon: Mail, title: 'البريد الإلكتروني', body: <a href={`mailto:${c.email}`} className="text-primary hover:underline">{c.email}</a>},
              {icon: Clock, title: 'مواعيد العمل', body: <span className="text-content-muted">{c.hours}</span>},
              {icon: MapPin, title: 'المكان', body: <span className="text-content-muted">{c.city} — وجلسات عن بُعد</span>},
            ].map(({icon: Icon, title, body}) => (
              <Card key={title} className="flex items-start gap-5 p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mist text-primary"><Icon size={22} aria-hidden="true" /></span>
                <div>
                  <h2 className="text-base text-content">{title}</h2>
                  <p className="mt-1 leading-8">{body}</p>
                </div>
              </Card>
            ))}
            <p className="rounded-2xl bg-accent-soft p-6 text-sm leading-8 text-content">
              في الحالات الطارئة أو عند وجود خطر على الحياة، تواصل فورًا مع خدمات الطوارئ في بلدك. هذا الموقع ليس خدمة طوارئ.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
