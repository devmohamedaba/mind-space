import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Button from '../components/ui/Button'
import SpecialistCard from '../components/sections/SpecialistCard'
import {SEO_PAGES} from '../config/seoPages'
import specialists from '../data/specialists'

export default function Specialists() {
  const page = SEO_PAGES[2]
  return (
    <>
      <Seo title={page.title} description={page.description} path="/specialists" />
      <section className="bg-surface-alt pb-6 pt-16 sm:pt-24">
        <Container>
          <SectionTitle as="h1" eyebrow="الأخصائيون" title="تعرّف على فريقنا" subtitle="اختر الأخصائي الأقرب لاحتياجك وفئتك العمرية. وإن لم تكن متأكدًا فراسلنا وسنرشّح لك الأنسب." />
        </Container>
      </section>
      <Section tone="alt" className="!pt-10">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {specialists.map((p) => <SpecialistCard key={p.id} person={p} />)}
          </div>
        </Container>
      </Section>
      <Section>
        <Container narrow>
          <div className="rounded-3xl bg-mist/70 p-10 text-center">
            <h2 className="text-2xl">لا تعرف من يناسبك؟</h2>
            <p className="mt-4 leading-9 text-content-muted">اكتب لنا بإيجاز عمّا يشغلك، وسنرشّح لك الأخصائي المناسب لحالتك.</p>
            <div className="mt-8"><Button to="/contact" size="lg">اطلب ترشيحًا</Button></div>
          </div>
        </Container>
      </Section>
    </>
  )
}
