import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import siteConfig from '../../config/siteConfig'

export default function Logo({className = ''}) {
  return (
    <Link to="/" aria-label={`${siteConfig.name} — الصفحة الرئيسية`} className={`inline-flex items-center gap-3 ${className}`}>
      <img src="/logo/logo.svg" alt="" width="44" height="44" className="h-11 w-11" />
      <span className="text-xl font-semibold text-content">{siteConfig.name}</span>
    </Link>
  )
}

Logo.propTypes = {className: PropTypes.string}
