import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {ArrowLeft, Clock3} from 'lucide-react'

import Card from '../ui/Card'
import {readTimeLabel} from '../../hooks/useArticles'

export default function ArticleCard({article}) {
  return (
    <Card as="article" className="group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift">
      <Link to={`/resources/${article.slug}`} className="block aspect-[16/9] overflow-hidden bg-mist" tabIndex={-1} aria-hidden="true">
        <img
          src={article.image}
          alt=""
          width="1200"
          height="630"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-7">
        {article.category && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-text">
            {article.category}
          </span>
        )}
        <h3 className="text-xl leading-9 text-content">
          <Link to={`/resources/${article.slug}`} className="hover:text-primary">{article.title}</Link>
        </h3>
        <p className="mt-3 flex-1 leading-8 text-content-muted">{article.excerpt}</p>
        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-content-muted">
          <span className="inline-flex items-center gap-2"><Clock3 size={16} aria-hidden="true" />{readTimeLabel(article.readMinutes)}</span>
          <Link to={`/resources/${article.slug}`} className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
            اقرأ المقال <ArrowLeft size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  )
}

ArticleCard.propTypes = {article: PropTypes.object.isRequired}
