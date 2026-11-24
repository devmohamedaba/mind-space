import PropTypes from 'prop-types'
import {BrowserRouter} from 'react-router-dom'
import {HelmetProvider} from 'react-helmet-async'
import {Toaster} from 'react-hot-toast'

export default function AppProviders({children}) {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgb(var(--surface-card))',
              color: 'rgb(var(--text-primary))',
              border: '1px solid rgb(var(--border))',
              borderRadius: '16px',
              padding: '14px 18px',
              fontSize: '15px',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  )
}

AppProviders.propTypes = {children: PropTypes.node.isRequired}
