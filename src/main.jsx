import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource-variable/alexandria/wght.css'
import './index.css'

import App from './app/App'
import AppProviders from './app/AppProviders'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
)
