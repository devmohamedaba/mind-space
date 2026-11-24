import {Link} from 'react-router-dom'
import {ArrowLeft, Brain, HeartHandshake, Sprout, ShieldCheck, Lock, Languages} from 'lucide-react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ArticleCard from '../components/sections/ArticleCard'
import SpecialistCard from '../components/sections/SpecialistCard'

import siteConfig from '../config/siteConfig'
import {SEO_PAGES} from '../config/seoPages'
import specialists from '../data/specialists'
import useArticles from '../hooks/useArticles'

const AREAS = [
  {icon: Brain, title: 'القلق والتوتر', text: 'نتعلّم معًا كيف نفهم القلق ونهدّئ الجسد والأفكار، ونبني عادات تخفف الضغط اليومي.'},
  {icon: HeartHandshake, title: 'العلاقات والأسرة', text: 'مساحة للحوار الآمن داخل العلاقة الزوجية والأسرية، وتعلّم التواصل ووضع الحدود باحترام.'},
  {icon: Sprout, title: 'المراهقون والأطفال', text: 'دعم يناسب كل مرحلة عمرية، مع إرشاد لأولياء الأمور ليكونوا سندًا لأبنائهم.'},
]

const STEPS = [
  {n: '١', title: 'تواصل معنا', text: 'أخبرنا باختصار بما يشغلك عبر واتساب أو نموذج التواصل. لا حاجة لشرح كل التفاصيل.'},
  {n: '٢', title: 'نرشّح لك الأنسب', text: 'نقترح عليك الأخصائي الأقرب لحالتك وفئتك العمرية، ونحدد موعدًا يناسبك.'},
  {n: '٣', title: 'ابدأ جلستك', text: 'جلسة هادئة وسرّية، حضوريًا أو عن بُعد، تضع فيها أول خطوة بوتيرتك أنت.'},
]

const TRUST = [
  {icon: Lock, title: 'خصوصية كاملة', text: 'كل ما تقوله في الجلسة يبقى سرّيًا.'},
  {icon: ShieldCheck, title: 'نهج قائم على العلم', text: 'نعتمد أساليب معروفة ومحترمة مهنيًا.'},
  {icon: Languages, title: 'بالعربية وبلغتك اليومية', text: 'تعبّر عن نفسك بالكلمات التي تعرفها.'},
]

export default function Home() {
  const {articles} = useArticles()
  const page = SEO_PAGES[0]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/logo/logo-512.png`,
      description: siteConfig.description,
      email: siteConfig.contact.email,
      areaServed: 'EG',
      knowsLanguage: 'ar',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
      inLanguage: 'ar',
    },
  ]

  return (
    <>
      <Seo title={page.title} description={page.description} path="/" jsonLd={jsonLd} />

      {/* ===== البطل ===== */}
      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 inline-flex rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary">
              منصة عربية للصحة النفسية
            </p>
            <h1 className="text-3xl leading-[1.6] text-content sm:text-5xl sm:leading-[1.5]">
              مساحة آمنة تبدأ منها رحلتك نحو <span className="text-primary">توازنك النفسي</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-content-muted">
              استشارات نفسية بخصوصية واحترام، مع أخصائيين يصغون إليك دون أحكام، ومقالات مبسّطة تساعدك على فهم نفسك خطوة بخطوة.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/contact" size="lg">احجز استشارتك</Button>
              <Button to="/resources" variant="outline" size="lg">تصفّح المقالات</Button>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-mist shadow-lift">
              <img src="/images/hero.svg" alt="رسم هادئ لشخص يجلس بسلام بين نباتات ونافذة مقوّسة وشمس دافئة" width="1200" height="1000" fetchpriority="high" className="h-auto w-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* ===== الثقة ===== */}
      <section className="border-y border-border bg-surface-alt py-10">
        <Container>
          <ul className="grid gap-8 sm:grid-cols-3">
            {TRUST.map(({icon: Icon, title, text}) => (
              <li key={title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary"><Icon size={22} aria-hidden="true" /></span>
                <div>
                  <p className="font-semibold text-content">{title}</p>
                  <p className="mt-1 text-sm leading-7 text-content-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== مجالات الدعم ===== */}
      <Section>
        <Container>
          <SectionTitle eyebrow="كيف نساعدك" title="دعم يناسب ما تمرّ به" subtitle="نقدّم استشارات في مجالات متعددة، وتختار أنت الوتيرة التي تشعرك بالراحة." />
          <div className="grid gap-8 md:grid-cols-3">
            {AREAS.map(({icon: Icon, title, text}) => (
              <Card key={title} className="p-9">
                <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-primary"><Icon size={26} aria-hidden="true" /></span>
                <h3 className="text-xl text-content">{title}</h3>
                <p className="mt-4 leading-8 text-content-muted">{text}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== خطوات البدء ===== */}
      <Section tone="mist">
        <Container>
          <SectionTitle eyebrow="البداية سهلة" title="ثلاث خطوات بسيطة" />
          <ol className="grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-3xl bg-surface-card p-9 shadow-soft">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-on" aria-hidden="true">{s.n}</span>
                <h3 className="text-xl text-content">{s.title}</h3>
                <p className="mt-3 leading-8 text-content-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ===== الأخصائيون ===== */}
      <Section>
        <Container>
          <SectionTitle eyebrow="فريقنا" title="أخصائيون تثق بهم" subtitle="كل أخصائي له مجالات اهتمام وفئة عمرية يعمل معها، لتجد من يفهم احتياجك." />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {specialists.map((p) => <SpecialistCard key={p.id} person={p} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/specialists" className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
              تعرّف على الفريق <ArrowLeft size={18} aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ===== أحدث المقالات ===== */}
      <Section tone="alt">
        <Container>
          <SectionTitle eyebrow="المقالات" title="اقرأ بهدوء، وافهم نفسك أكثر" subtitle="مقالات عربية مبسّطة عن القلق والنوم والعلاقات والعناية بالنفس." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
          <div className="mt-12 text-center">
            <Button to="/resources" variant="outline">كل المقالات</Button>
          </div>
        </Container>
      </Section>

      {/* ===== دعوة أخيرة ===== */}
      <Section>
        <Container narrow>
          <div className="rounded-[2rem] bg-primary px-8 py-14 text-center text-primary-on shadow-lift sm:px-14">
            <h2 className="text-2xl leading-[1.6] sm:text-3xl">لست مضطرًا لتحمّل كل شيء وحدك</h2>
            <p className="mx-auto mt-5 max-w-xl leading-9 opacity-90">
              خطوة صغيرة اليوم قد تغيّر كثيرًا. راسلنا وسنرافقك في اختيار البداية المناسبة.
            </p>
            <div className="mt-9">
              <Button to="/contact" variant="accent" size="lg">تواصل معنا الآن</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
