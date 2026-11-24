import PropTypes from 'prop-types'

export default function Container({children, className = '', narrow = false}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-8 ${narrow ? 'max-w-3xl' : 'max-w-6xl'} ${className}`}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  narrow: PropTypes.bool,
}
