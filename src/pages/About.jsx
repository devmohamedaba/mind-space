import {HeartHandshake, ShieldCheck, Eye, Sprout} from 'lucide-react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import {SEO_PAGES} from '../config/seoPages'

const VALUES = [
  {icon: HeartHandshake, title: 'الاحترام والتعاطف', text: 'نصغي دون حكم، ونحترم قصتك وخلفيتك وقيمك.'},
  {icon: ShieldCheck, title: 'السرّية والأمان', text: 'خصوصيتك التزام لا نتهاون فيه في كل خطوة.'},
  {icon: Eye, title: 'الوضوح والصدق', text: 'نشرح لك طريقة العمل وما يمكن توقعه بواقعية، ولا نَعِد بنتائج مضمونة.'},
  {icon: Sprout, title: 'النمو التدريجي', text: 'التغيير يحدث بخطوات صغيرة ثابتة، وبوتيرتك أنت.'},
]

export default function About() {
  const page = SEO_PAGES[1]

  return (
    <>
      <Seo title={page.title} description={page.description} path="/about" />

      <section className="bg-surface py-16 sm:py-24">
        <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 text-sm font-medium text-accent-text">من نحن</p>
            <h1 className="text-3xl leading-[1.6] sm:text-4xl sm:leading-[1.5]">مساحة تُصغي إليك وتفهمك</h1>
            <p className="mt-6 text-lg leading-9 text-content-muted">
              بدأت «مساحة نفسية» من فكرة بسيطة: أن يجد كل شخص مكانًا آمنًا يتحدث فيه عمّا يشغله، مع أخصائي يفهم ويحترم، وبلغة عربية قريبة من القلب.
            </p>
            <p className="mt-5 text-lg leading-9 text-content-muted">
              نؤمن أن طلب المساعدة وعيٌ ومسؤولية، وأن العناية بالصحة النفسية لا تقل أهمية عن العناية بالصحة الجسدية.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] bg-mist shadow-lift">
            <img src="/images/about.svg" alt="رسم لشخصين يجلسان بهدوء بين نباتات تحت شمس دافئة" width="1200" height="900" fetchpriority="high" className="h-auto w-full" />
          </div>
        </Container>
      </section>

      <Section tone="alt">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="p-10">
              <h2 className="text-2xl text-content">رسالتنا</h2>
              <p className="mt-5 leading-9 text-content-muted">
                أن نجعل الدعم النفسي المهني أقرب وأوضح وأقل رهبة، عبر أخصائيين مؤهلين ومحتوى عربي موثوق يبسّط المفاهيم دون تبسيط مخلّ.
              </p>
            </Card>
            <Card className="p-10">
              <h2 className="text-2xl text-content">رؤيتنا</h2>
              <p className="mt-5 leading-9 text-content-muted">
                مجتمع يتحدث عن الصحة النفسية بلا وصمة، ويعرف فيه كل شخص أين يبدأ حين يحتاج إلى مساعدة.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle eyebrow="قيمنا" title="ما نلتزم به معك" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({icon: Icon, title, text}) => (
              <div key={title} className="rounded-3xl border border-border bg-surface-card p-8 shadow-soft">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-primary"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="text-lg text-content">{title}</h3>
                <p className="mt-3 leading-8 text-content-muted">{text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container narrow>
          <h2 className="text-center text-2xl sm:text-3xl">كيف نعمل؟</h2>
          <ol className="mt-12 space-y-8">
            {[
              ['نستمع أولًا', 'نبدأ بفهم ظروفك وما دفعك لطلب المساعدة، دون استعجال.'],
              ['نضع أهدافًا واقعية', 'نتفق معك على أهداف مبدئية نراجعها دوريًا.'],
              ['نرافقك بأدوات عملية', 'حوار وتمارين بسيطة تجرّبها في يومك، وتتعلّم منها.'],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-on" aria-hidden="true">{i + 1}</span>
                <div>
                  <h3 className="text-xl text-content">{t}</h3>
                  <p className="mt-2 leading-9 text-content-muted">{d}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-14 rounded-2xl bg-surface-card p-6 text-sm leading-8 text-content-muted shadow-soft">
            تنبيه مهم: مساحة نفسية لا تقدّم خدمات الطوارئ. إذا كنت أنت أو شخص قريب منك في خطر فوري، فتواصل مع خدمات الطوارئ في بلدك.
          </p>
          <div className="mt-12 text-center"><Button to="/contact" size="lg">ابدأ بالتواصل معنا</Button></div>
        </Container>
      </Section>
    </>
  )
}
