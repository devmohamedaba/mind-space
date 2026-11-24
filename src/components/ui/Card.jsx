import PropTypes from 'prop-types'

export default function Card({children, className = '', as: Tag = 'div'}) {
  return (
    <Tag className={`rounded-3xl border border-border bg-surface-card shadow-soft ${className}`}>
      {children}
    </Tag>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  as: PropTypes.string,
}
