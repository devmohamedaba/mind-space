import {useMemo, useState} from 'react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import SectionTitle from '../components/ui/SectionTitle'
import ArticleCard from '../components/sections/ArticleCard'
import {SEO_PAGES} from '../config/seoPages'
import siteConfig from '../config/siteConfig'
import useArticles from '../hooks/useArticles'

const ALL = 'الكل'

export default function Resources() {
  const page = SEO_PAGES[3]
  const {articles} = useArticles()
  const [active, setActive] = useState(ALL)

  const categories = useMemo(() => [ALL, ...Array.from(new Set(articles.map((a) => a.category).filter(Boolean)))], [articles])
  const shown = active === ALL ? articles : articles.filter((a) => a.category === active)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'مقالات الصحة النفسية',
    url: `${siteConfig.url}/resources`,
    inLanguage: 'ar',
    hasPart: articles.slice(0, 20).map((a) => ({'@type': 'Article', headline: a.title, url: `${siteConfig.url}/resources/${a.slug}`})),
  }

  return (
    <>
      <Seo title={page.title} description={page.description} path="/resources" jsonLd={jsonLd} />
      <section className="bg-surface-alt pb-6 pt-16 sm:pt-24">
        <Container>
          <SectionTitle as="h1" eyebrow="المقالات" title="مقالات تساعدك على فهم نفسك" subtitle="محتوى عربي مبسّط وموثوق عن الصحة النفسية، يُكتب بعناية ويُراجَع علميًا." />
        </Container>
      </section>

      <Section tone="alt" className="!pt-8">
        <Container>
          {categories.length > 2 && (
            <div role="group" aria-label="تصفية حسب التصنيف" className="mb-12 flex flex-wrap justify-center gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActive(c)}
                  aria-pressed={active === c}
                  className={`min-h-[44px] rounded-full border px-5 text-sm transition-colors ${active === c ? 'border-primary bg-primary text-primary-on' : 'border-border bg-surface-card text-content hover:bg-primary-soft'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
          {shown.length === 0 && <p className="text-center text-content-muted">لا توجد مقالات في هذا التصنيف بعد.</p>}
        </Container>
      </Section>
    </>
  )
}
