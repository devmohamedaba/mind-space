import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet-async'

import siteConfig from '../../config/siteConfig'

const abs = (u) => (/^https?:\/\//.test(u) ? u : `${siteConfig.url}${u}`)

// عناصر <head> لكل صفحة. العلامات تحمل data-rh كي تحلّ محل نسخة البناء المسبق دون تكرار.
export default function Seo({title, description, path = '/', image = '/images/og-cover.png', type = 'website', noindex = false, jsonLd, published, modified}) {
  const url = `${siteConfig.url}${path === '/' ? '' : path}`
  const robots = noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large'

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={abs(image)} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:site_name" content={siteConfig.name} />
      {published && <meta property="article:published_time" content={published} />}
      {modified && <meta property="article:modified_time" content={modified} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={abs(image)} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string,
  noindex: PropTypes.bool,
  jsonLd: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  published: PropTypes.string,
  modified: PropTypes.string,
}
