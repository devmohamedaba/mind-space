import {Config} from 'tailwindcss'

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

const config: Config = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Alexandria Variable"', 'Alexandria', 'Tahoma', 'system-ui', 'sans-serif'],
      },
      colors: {
        // الأخضر الغابي: الأزرار والعناصر القوية
        primary: {
          DEFAULT: v('primary'),
          dark: v('primary-dark'),
          soft: v('primary-soft'),
          on: v('on-primary'),
        },
        // الأخضر المريمي والضبابي: أسطح هادئة
        secondary: {
          DEFAULT: v('sage'),
          soft: v('sage-soft'),
        },
        mist: v('mist'),
        // الخوخي الترابي: لمسة دافئة قليلة
        accent: {
          DEFAULT: v('accent'),
          soft: v('accent-soft'),
          text: v('accent-text'),
        },
        success: v('success'),
        warning: v('warning'),
        error: v('error'),
        surface: {
          DEFAULT: v('surface'),
          alt: v('surface-alt'),
          card: v('surface-card'),
        },
        content: {
          DEFAULT: v('text-primary'),
          muted: v('text-secondary'),
        },
        border: {DEFAULT: v('border')},
      },
      boxShadow: {
        soft: '0 1px 2px rgb(31 42 37 / 0.04), 0 4px 16px rgb(31 42 37 / 0.04)',
        lift: '0 2px 4px rgb(31 42 37 / 0.05), 0 10px 28px rgb(31 42 37 / 0.07)',
      },
      borderRadius: {xl2: '1.25rem'},
    },
  },
  plugins: [],
}

export default config
