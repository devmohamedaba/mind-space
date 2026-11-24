import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const variants = {
  primary: 'bg-primary text-primary-on hover:bg-primary-dark shadow-soft',
  outline: 'border border-primary/40 text-primary hover:bg-primary-soft',
  soft: 'bg-primary-soft text-primary hover:bg-mist',
  ghost: 'text-primary hover:bg-primary-soft',
  accent: 'bg-accent text-[#1F2A25] hover:bg-accent/85 shadow-soft',
}

const sizes = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

// يعمل كزر، أو كرابط داخلي (to)، أو كرابط خارجي (href)
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
  to,
  href,
  ...rest
}) {
  const classes = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>
  if (href) {
    return (
      <a href={href} className={classes} {...(href.startsWith('http') ? {target: '_blank', rel: 'noopener noreferrer'} : {})} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variants)),
  size: PropTypes.oneOf(Object.keys(sizes)),
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  href: PropTypes.string,
}
