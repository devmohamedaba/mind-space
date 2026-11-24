import {Outlet} from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../common/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      <a href="#main" className="skip-link">تخطَّ إلى المحتوى</a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
