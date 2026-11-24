import PropTypes from 'prop-types'

export default function SectionTitle({eyebrow, title, subtitle, align = 'center', as: Tag = 'h2'}) {
  return (
    <div className={`mb-12 sm:mb-14 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium text-accent-text">{eyebrow}</p>
      )}
      <Tag className="text-2xl text-content sm:text-4xl sm:leading-[1.4]">{title}</Tag>
      {subtitle && (
        <p className="mt-4 text-base leading-8 text-content-muted sm:text-lg">{subtitle}</p>
      )}
    </div>
  )
}

SectionTitle.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['center', 'start']),
  as: PropTypes.string,
}
