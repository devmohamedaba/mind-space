# مساحة نفسية

موقع عربي (RTL) للصحة النفسية: الرئيسية، من نحن، الأخصائيون، المقالات، الأسئلة الشائعة، تواصل معنا.
React 18 + Vite + Tailwind، وضع داكن، خط Alexandria، سيو متقدم، ولوحة تحكم لإدارة المقالات عبر Google Sheets.

## التشغيل محليًا
```bash
yarn install
yarn dev          # التطوير
yarn build        # بناء الإنتاج (يولّد الصفحات الثابتة و sitemap.xml و robots.txt)
yarn preview      # معاينة نسخة الإنتاج
```

## النشر على Vercel
1. Import للمستودع من GitHub (Framework: Vite، أمر البناء `yarn build`، مجلد الإخراج `dist`).
2. بعد أول نشر، عدّل `url` في `src/config/siteConfig.js` إلى رابطك/دومينك الحقيقي (أو اضبط متغير `SITE_URL`) ثم أعد النشر.
3. فعّل لوحة التحكم بإضافة المتغيرات من `.env.example` (راجع `docs/CMS-SETUP.md`).
4. في Google Search Console: أضف الموقع وقدّم `https://دومينك/sitemap.xml`.

## ما تغيّره قبل النشر الحقيقي
| الملف | ما تغيّره |
|---|---|
| `src/config/siteConfig.js` | الدومين، الواتساب، البريد، الهاتف، المواعيد، روابط التواصل الاجتماعي |
| `src/data/specialists.js` | **بيانات تجريبية** — ضع أخصائييك الحقيقيين |
| `src/data/articles.js` | مقالات مبدئية (يمكن حذفها بعد إنشاء مقالاتك من لوحة التحكم) |
| `src/data/faq.js` | الأسئلة الشائعة |
| `public/images`, `public/logo` | الصور والشعار (مولّدة؛ استبدلها بصور حقيقية متى أردت) |

## الألوان (في `src/index.css`)
أخضر غابي `#2F5044` للأزرار والعناصر القوية، أخضر مريمي وضبابي للأسطح الهادئة، عاجي دافئ للخلفية،
خوخي ترابي للّمسات، ورمادي زيتي للنص الثانوي. لكل لون نسخة للوضع الداكن. غيّر القيم من مكان واحد.

## إعادة توليد الصور
`python3 tools/generate-assets.py` (يحتاج Python و Playwright و Pillow). عدّل الألوان في أعلى الملف.

## SEO المضمَّن
- صفحات ثابتة مُولَّدة مسبقًا لكل مسار ومقال (title, description, canonical, Open Graph, Twitter, JSON-LD) داخل `<head>` مع محتوى نصي للروبوتات.
- `sitemap.xml` و `robots.txt` يُكتبان تلقائيًا عند البناء ويشملان مقالات لوحة التحكم.
- Schema: Organization, WebSite, Article, BreadcrumbList, FAQPage, CollectionPage, ContactPage.
- وسوم `lang="ar" dir="rtl"`، صور بأبعاد وlazy-loading، خط مستضاف ذاتيًا، رؤوس أمان وتخزين مؤقت في `vercel.json`.
- صفحات `/admin` و`/api` خارج الفهرسة.

## لوحة التحكم
المسار `/admin` (غير مرتبط من الموقع). التفاصيل الكاملة في [`docs/CMS-SETUP.md`](docs/CMS-SETUP.md).
