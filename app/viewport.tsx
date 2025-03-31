import { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' }
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1
}

export default viewport