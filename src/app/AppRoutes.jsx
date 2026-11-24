import {lazy} from 'react'
import {Route, Routes} from 'react-router-dom'

import MainLayout from '../components/layout/MainLayout'

const Home = lazy(() => import('../pages/Home'))
const About = lazy(() => import('../pages/About'))
const Specialists = lazy(() => import('../pages/Specialists'))
const Resources = lazy(() => import('../pages/Resources'))
const ArticleDetail = lazy(() => import('../pages/ArticleDetail'))
const FAQ = lazy(() => import('../pages/FAQ'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

// لوحة التحكم (مفصولة عن الموقع، لا تُحمَّل للزوار العاديين ولا تُفهرَس)
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'))
const AdminGuard = lazy(() => import('../pages/admin/AdminGuard'))
const ArticlesManager = lazy(() => import('../pages/admin/ArticlesManager'))
const ArticleEditor = lazy(() => import('../pages/admin/ArticleEditor'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route element={<AdminGuard />}>
        <Route path="/admin/articles" element={<ArticlesManager />} />
        <Route path="/admin/articles/new" element={<ArticleEditor />} />
        <Route path="/admin/articles/edit/:id" element={<ArticleEditor />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/specialists" element={<Specialists />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/:slug" element={<ArticleDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
