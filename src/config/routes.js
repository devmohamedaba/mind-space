// src/config/routes.js
const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SPECIALISTS: '/specialists',
  RESOURCES: '/resources',
  FAQ: '/faq',
  CONTACT: '/contact',
}

export const NAV_ITEMS = [
  {label: 'الرئيسية', to: ROUTES.HOME},
  {label: 'من نحن', to: ROUTES.ABOUT},
  {label: 'الأخصائيون', to: ROUTES.SPECIALISTS},
  {label: 'المقالات', to: ROUTES.RESOURCES},
  {label: 'الأسئلة الشائعة', to: ROUTES.FAQ},
  {label: 'تواصل معنا', to: ROUTES.CONTACT},
]

export default ROUTES
