// src/hooks/useArticles.js
// قائمة واحدة لكل الموقع: المقالات الثابتة (src/data/articles.js) + مقالات لوحة التحكم (/articles.json).
// عند تطابق الرابط (slug) تحلّ مقالة لوحة التحكم محل الثابتة.

import {useEffect, useMemo, useState} from 'react'

import staticArticles from '../data/articles'
import {loadCmsArticles} from '../lib/publicArticles'

const fromCms = (a) => ({
  slug: a.slug,
  title: a.title_ar || a.title_en || '',
  excerpt: a.excerpt_ar || a.excerpt_en || '',
  author: a.author || 'فريق مساحة نفسية',
  category: a.category_ar || a.category_en || '',
  image: a.image || '/images/articles/default.svg',
  imageAlt: a.image_alt_ar || a.title_ar || '',
  readMinutes: a.read_minutes || 1,
  publishedAt: a.published_at,
  modifiedAt: a.updated_at || a.published_at,
  seoTitle: a.seo_title_ar || '',
  seoDescription: a.seo_description_ar || '',
  html: a.content_ar || a.content_en || '',
})

export default function useArticles() {
  const [cms, setCms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    loadCmsArticles().then((list) => {
      if (!active) return
      setCms(list)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  const articles = useMemo(() => {
    const cmsList = cms.map(fromCms)
    const taken = new Set(cmsList.map((a) => a.slug))
    const rest = staticArticles.filter((a) => !taken.has(a.slug)).map((a) => ({...a, modifiedAt: a.publishedAt}))
    return [...cmsList, ...rest].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
  }, [cms])

  return {articles, loading}
}

export const readTimeLabel = (m) => (m <= 1 ? 'دقيقة قراءة' : m <= 10 ? `${m} دقائق قراءة` : `${m} دقيقة قراءة`)
export const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ar-EG', {year: 'numeric', month: 'long', day: 'numeric'})
}
