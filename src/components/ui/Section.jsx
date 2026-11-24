import PropTypes from 'prop-types'

const tones = {
  base: 'bg-surface',
  alt: 'bg-surface-alt',
  mist: 'bg-mist/60',
}

export default function Section({children, className = '', tone = 'base', id}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${tones[tone]} ${className}`}>
      {children}
    </section>
  )
}

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tone: PropTypes.oneOf(['base', 'alt', 'mist']),
  id: PropTypes.string,
}
