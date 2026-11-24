# مساحة نفسية (Mind Space) - حالة المشروع

## المواصفات
- موقع لصفحة فيسبوك متخصصة في الصحة النفسية والاستشارات والجلسات
- Vite + React 18 + Tailwind CSS 3 + React Router 6 + react-helmet-async
- RTL عربي كامل، خطوط: Cairo (عناوين) / Tajawal (نص) / IBM Plex Sans Arabic (عناصر مساعدة)
- الألوان: plum (بنفسجي)، sage (أخضر هادئ)، sand (خلفية دافئة)، rose (لمسة دافئة)، ink (نص)
- العنصر المميز: BreathingOrb (شكل يتنفس ببطء)

## ما تم إنجازه
- package.json, vite.config.js, tailwind.config.js, postcss.config.js
- index.html (SEO كامل + JSON-LD + Open Graph)
- src: main.jsx, App.jsx, index.css
- components: SEO, BreathingOrb, Navbar, Footer, Icon, ScrollToTop
- data: services.js
- pages: Home, About, Services

## المتبقي
- pages/Contact.jsx (نموذج تواصل + EmailJS أو واتساب)
- pages/NotFound.jsx (App.jsx يستورده حاليا)
- public/robots.txt, public/sitemap.xml, public/favicon.svg, og-image.jpg
- سكربت prerender لتحسين SEO وروابط فيسبوك
- README بخطوات التشغيل والنشر

## قرارات يجب تثبيتها
- استبدال كل REPLACE_WITH_YOUR_DOMAIN و REPLACE_WITH_YOUR_PAGE
- بيانات الفريق والإحصائيات والتقييم في الصفحات هي نصوص تجريبية ويجب استبدالها ببيانات حقيقية
- اللغة: عربي فقط حاليا (i18n اختياري لاحقا)

## سجل التحديثات
- 2026-11-04: الهيكل الأساسي والصفحات الثلاث
