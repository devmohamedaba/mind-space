import {ChevronDown} from 'lucide-react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import {SEO_PAGES} from '../config/seoPages'
import faq from '../data/faq'

export default function FAQ() {
  const page = SEO_PAGES[4]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ar',
    mainEntity: faq.map((i) => ({'@type': 'Question', name: i.q, acceptedAnswer: {'@type': 'Answer', text: i.a}})),
  }

  return (
    <>
      <Seo title={page.title} description={page.description} path="/faq" jsonLd={jsonLd} />
      <section className="bg-surface-alt pb-6 pt-16 sm:pt-24">
        <Container>
          <SectionTitle as="h1" eyebrow="الأسئلة الشائعة" title="إجابات تطمئنك قبل أن تبدأ" subtitle="جمعنا لك أكثر الأسئلة التي تصلنا. وإن لم تجد سؤالك فراسلنا." />
        </Container>
      </section>
      <Section tone="alt" className="!pt-8">
        <Container narrow>
          <div className="space-y-5">
            {faq.map((item) => (
              <details key={item.q} className="group rounded-3xl border border-border bg-surface-card shadow-soft open:shadow-lift">
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-7 py-5 text-lg font-medium text-content [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <ChevronDown size={22} className="shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-7 pb-7 leading-9 text-content-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-16 rounded-3xl bg-mist/70 p-10 text-center">
            <h2 className="text-2xl">ما زال لديك سؤال؟</h2>
            <p className="mt-3 leading-9 text-content-muted">اكتب لنا وسنرد عليك في أقرب وقت.</p>
            <div className="mt-7"><Button to="/contact" size="lg">تواصل معنا</Button></div>
          </div>
        </Container>
      </Section>
    </>
  )
}
