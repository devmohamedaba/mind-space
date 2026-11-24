// scripts/prerender.mjs  (يعمل تلقائيًا بعد `vite build`)
// يولّد نسخًا ثابتة لكل صفحات الموقع والمقالات (CMS + الثابتة) داخل dist/ مع:
//   - <title> و description و canonical و Open Graph و Twitter و JSON-LD داخل <head>
//   - محتوى نصي أساسي داخل #root لتقرأه محركات البحث وروبوتات المعاينة التي لا تشغّل JavaScript
// ثم يكتب sitemap.xml و robots.txt كاملين من الإعدادات.
// العلامات تحمل data-rh="true" كي تستبدلها react-helmet-async عند تشغيل React (بلا تكرار).

import fs from 'node:fs'
import path from 'node:path'
import {pathToFileURL} from 'node:url'
import {htmlToText, sanitizeArticleHtml} from '../shared/articleSchema.js'

const DIST = path.resolve('dist')
const SRC = path.resolve('src')
const load = async (p) => (await import(pathToFileURL(path.join(SRC, p)))).default

const siteConfig = await load('config/siteConfig.js')
const staticArticles = await load('data/articles.js')
const faq = await load('data/faq.js')
const {SEO_PAGES} = await import(pathToFileURL(path.join(SRC, 'config/seoPages.js')))

const SITE = (process.env.SITE_URL || siteConfig.url).replace(/\/$/, '')
const DEFAULT_IMAGE = '/images/og-cover.png'

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')
const jsonLd = (data) => `<script type="application/ld+json" data-rh="true">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
const absolute = (u) => (/^https?:\/\//.test(u) ? u : `${SITE}${u || DEFAULT_IMAGE}`)

// ---------- المقالات: الثابتة ثم مقالات لوحة التحكم (تحلّ محلها عند تطابق الرابط) ----------
function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return fallback
  }
}

const bySlug = new Map()
for (const a of staticArticles) {
  bySlug.set(a.slug, {
    slug: a.slug, heading: a.title, title: a.title, description: a.excerpt, author: a.author, category: a.category,
    image: a.image, imageAlt: a.imageAlt, html: sanitizeArticleHtml(a.html), published: a.publishedAt, modified: a.publishedAt,
  })
}
for (const a of readJson(path.join(DIST, 'articles.json'), {articles: []}).articles || []) {
  bySlug.set(a.slug, {
    slug: a.slug, heading: a.title_ar, title: a.seo_title_ar || a.title_ar, description: a.seo_description_ar || a.excerpt_ar,
    author: a.author, category: a.category_ar, image: a.image || '/images/articles/default.svg', imageAlt: a.image_alt_ar || a.title_ar,
    html: sanitizeArticleHtml(a.content_ar), published: a.published_at, modified: a.updated_at || a.published_at,
  })
}
const articles = [...bySlug.values()].sort((x, y) => String(y.published).localeCompare(String(x.published)))

// ---------- القالب ----------
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8')

function headTags({title, description, url, image, type = 'website', extra = []}) {
  return [
    `<meta name="description" content="${esc(description)}" data-rh="true" />`,
    `<link rel="canonical" href="${esc(url)}" data-rh="true" />`,
    `<meta name="robots" content="index,follow,max-image-preview:large" data-rh="true" />`,
    `<meta property="og:type" content="${type}" data-rh="true" />`,
    `<meta property="og:title" content="${esc(title)}" data-rh="true" />`,
    `<meta property="og:description" content="${esc(description)}" data-rh="true" />`,
    `<meta property="og:url" content="${esc(url)}" data-rh="true" />`,
    `<meta property="og:image" content="${esc(absolute(image))}" data-rh="true" />`,
    `<meta property="og:locale" content="${siteConfig.locale}" data-rh="true" />`,
    `<meta property="og:site_name" content="${esc(siteConfig.name)}" data-rh="true" />`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true" />`,
    `<meta name="twitter:title" content="${esc(title)}" data-rh="true" />`,
    `<meta name="twitter:description" content="${esc(description)}" data-rh="true" />`,
    `<meta name="twitter:image" content="${esc(absolute(image))}" data-rh="true" />`,
    ...extra,
  ].join('\n    ')
}

function build({title, head, body}) {
  return template
    // يزيل وسوم الوصف و og المكتوبة افتراضيًا في index.html حتى لا تتكرر
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<meta property="og:(?:image|type)"[^>]*>/gi, '')
    .replace(/\s*<meta name="twitter:card"[^>]*>/i, '')
    .replace(/<title>[\s\S]*?<\/title>/i, `<title data-rh="true">${esc(title)}</title>`)
    .replace('</head>', `    ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

const wrap = (inner) => `<div style="max-width:46rem;margin:0 auto;padding:3rem 1.25rem;line-height:2">${inner}</div>`
const navLinks = () =>
  `<nav aria-label="روابط الموقع"><ul>${SEO_PAGES.map((p) => `<li><a href="${p.path}">${esc(p.title.split('|')[0].trim())}</a></li>`).join('')}</ul></nav>`

function write(routePath, html) {
  const dir = routePath === '/' ? DIST : path.join(DIST, routePath)
  fs.mkdirSync(dir, {recursive: true})
  fs.writeFileSync(path.join(dir, 'index.html'), html)
}

// ---------- الصفحات الثابتة ----------
for (const page of SEO_PAGES) {
  const url = `${SITE}${page.path === '/' ? '' : page.path}`
  const extra = []

  if (page.path === '/') {
    extra.push(
      jsonLd({'@context': 'https://schema.org', '@type': 'Organization', name: siteConfig.name, url: SITE, logo: `${SITE}/logo/logo-512.png`, description: siteConfig.description, email: siteConfig.contact.email, knowsLanguage: 'ar'}),
      jsonLd({'@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.name, url: SITE, inLanguage: 'ar'}),
    )
  }
  if (page.path === '/faq') {
    extra.push(jsonLd({'@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: 'ar', mainEntity: faq.map((i) => ({'@type': 'Question', name: i.q, acceptedAnswer: {'@type': 'Answer', text: i.a}}))}))
  }

  const heading = page.path === '/' ? siteConfig.tagline : page.title.split('|')[0].trim()
  let inner = `<h1>${esc(heading)}</h1><p>${esc(page.description)}</p>`
  if (page.path === '/faq') inner += faq.map((i) => `<h2>${esc(i.q)}</h2><p>${esc(i.a)}</p>`).join('')
  if (page.path === '/resources' || page.path === '/') {
    inner += `<ul>${articles.map((a) => `<li><a href="/resources/${esc(a.slug)}">${esc(a.heading)}</a></li>`).join('')}</ul>`
  }
  inner += navLinks()

  write(page.path, build({title: page.title, head: headTags({title: page.title, description: page.description, url, image: DEFAULT_IMAGE, extra}), body: wrap(inner)}))
}

// ---------- صفحات المقالات ----------
for (const a of articles) {
  const url = `${SITE}/resources/${a.slug}`
  const title = `${a.title} | ${siteConfig.name}`
  const description = a.description || htmlToText(a.html).slice(0, 160)

  const extra = [
    a.published ? `<meta property="article:published_time" content="${esc(a.published)}" data-rh="true" />` : '',
    a.modified ? `<meta property="article:modified_time" content="${esc(a.modified)}" data-rh="true" />` : '',
    jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article', headline: a.heading, description, image: [absolute(a.image)], inLanguage: 'ar',
          author: {'@type': 'Organization', name: a.author || siteConfig.name},
          datePublished: a.published || undefined, dateModified: a.modified || undefined,
          mainEntityOfPage: {'@type': 'WebPage', '@id': url},
          publisher: {'@type': 'Organization', name: siteConfig.name, url: SITE, logo: {'@type': 'ImageObject', url: `${SITE}/logo/logo-512.png`}},
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {'@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${SITE}/`},
            {'@type': 'ListItem', position: 2, name: 'المقالات', item: `${SITE}/resources`},
            {'@type': 'ListItem', position: 3, name: a.heading, item: url},
          ],
        },
      ],
    }),
  ].filter(Boolean)

  const body = wrap(`<article><h1>${esc(a.heading)}</h1><p>${esc(a.author)}${a.category ? ' · ' + esc(a.category) : ''}</p>${a.html}</article>${navLinks()}`)
  write(`/resources/${a.slug}`, build({title, head: headTags({title, description, url, image: a.image, type: 'article', extra}), body}))
}
console.log(`[seo] prerendered ${SEO_PAGES.length} page(s) + ${articles.length} article(s)`)

// ---------- sitemap.xml و robots.txt ----------
const today = new Date().toISOString().slice(0, 10)
const urls = [
  ...SEO_PAGES.map((p) => ({loc: `${SITE}${p.path === '/' ? '/' : p.path}`, lastmod: today, changefreq: p.changefreq, priority: p.priority})),
  ...articles.map((a) => ({loc: `${SITE}/resources/${a.slug}`, lastmod: (a.modified || a.published || today).slice(0, 10), changefreq: 'monthly', priority: '0.7'})),
]
fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${esc(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>\n`,
)
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`[seo] sitemap.xml (${urls.length} urls) and robots.txt written`)
