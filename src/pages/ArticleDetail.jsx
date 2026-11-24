import {useMemo} from 'react'
import {Link, useParams} from 'react-router-dom'
import DOMPurify from 'dompurify'
import {ArrowRight, CalendarDays, Clock3, UserRound} from 'lucide-react'

import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'
import ArticleCard from '../components/sections/ArticleCard'
import LoadingScreen from '../components/common/LoadingScreen'
import siteConfig from '../config/siteConfig'
import useArticles, {formatDate, readTimeLabel} from '../hooks/useArticles'

import '../styles/article-content.css'

export default function ArticleDetail() {
  const {slug} = useParams()
  const {articles, loading} = useArticles()
  const article = articles.find((a) => a.slug === slug)

  // طبقة تنظيف ثانية في المتصفح (الخادم ينظّف أيضًا)
  const html = useMemo(() => (article ? DOMPurify.sanitize(article.html) : ''), [article])

  if (!article) {
    if (loading) return <LoadingScreen />
    return (
      <>
        <Seo title={`المقال غير موجود | ${siteConfig.name}`} description="لم نعثر على هذا المقال." path={`/resources/${slug}`} noindex />
        <Section>
          <Container narrow>
            <div className="text-center">
              <h1 className="text-3xl">لم نعثر على هذا المقال</h1>
              <p className="mt-4 text-content-muted">ربما نُقل أو حُذف. تصفّح بقية المقالات.</p>
              <div className="mt-8"><Button to="/resources">كل المقالات</Button></div>
            </div>
          </Container>
        </Section>
      </>
    )
  }

  const url = `${siteConfig.url}/resources/${article.slug}`
  const absImage = /^https?:/.test(article.image) ? article.image : `${siteConfig.url}${article.image}`
  const seoTitle = `${article.seoTitle || article.title} | ${siteConfig.name}`
  const seoDescription = article.seoDescription || article.excerpt
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: article.title,
        description: seoDescription,
        image: [absImage],
        inLanguage: 'ar',
        author: {'@type': 'Organization', name: article.author || siteConfig.name},
        datePublished: article.publishedAt,
        dateModified: article.modifiedAt || article.publishedAt,
        mainEntityOfPage: {'@type': 'WebPage', '@id': url},
        publisher: {'@type': 'Organization', name: siteConfig.name, url: siteConfig.url, logo: {'@type': 'ImageObject', url: `${siteConfig.url}/logo/logo-512.png`}},
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {'@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${siteConfig.url}/`},
          {'@type': 'ListItem', position: 2, name: 'المقالات', item: `${siteConfig.url}/resources`},
          {'@type': 'ListItem', position: 3, name: article.title, item: url},
        ],
      },
    ],
  }

  return (
    <>
      <Seo title={seoTitle} description={seoDescription} path={`/resources/${article.slug}`} image={article.image} type="article" jsonLd={jsonLd} published={article.publishedAt} modified={article.modifiedAt} />

      <article>
        <header className="bg-surface-alt pb-14 pt-12 sm:pb-20 sm:pt-16">
          <Container narrow>
            <nav aria-label="مسار التنقل" className="mb-8 text-sm text-content-muted">
              <Link to="/" className="hover:text-primary">الرئيسية</Link> <span aria-hidden="true">/</span>{' '}
              <Link to="/resources" className="hover:text-primary">المقالات</Link>
            </nav>
            {article.category && <span className="mb-5 inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">{article.category}</span>}
            <h1 className="text-3xl leading-[1.7] sm:text-4xl sm:leading-[1.6]">{article.title}</h1>
            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-content-muted">
              <span className="inline-flex items-center gap-2"><UserRound size={16} aria-hidden="true" />{article.author}</span>
              {article.publishedAt && <span className="inline-flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" /><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></span>}
              <span className="inline-flex items-center gap-2"><Clock3 size={16} aria-hidden="true" />{readTimeLabel(article.readMinutes)}</span>
            </div>
          </Container>
        </header>

        <Section className="!pt-12 sm:!pt-16">
          <Container narrow>
            <img src={article.image} alt={article.imageAlt} width="1200" height="630" fetchpriority="high" className="mb-14 aspect-[1200/630] w-full rounded-3xl bg-mist object-cover shadow-soft" />
            <div className="article-content" dangerouslySetInnerHTML={{__html: html}} />
          </Container>
        </Section>
      </article>

      {related.length > 0 && (
        <Section tone="alt">
          <Container>
            <h2 className="mb-10 text-center text-2xl sm:text-3xl">قد يهمك أيضًا</h2>
            <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
              {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
            <div className="mt-12 text-center">
              <Link to="/resources" className="inline-flex items-center gap-2 font-medium text-primary hover:underline">كل المقالات <ArrowRight size={18} className="rotate-180" aria-hidden="true" /></Link>
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
