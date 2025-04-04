import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import FeedbackButton from '@/components/FeedbackButton' // Add this import

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrendScope - Real-time Social Trends',
  description: 'Discover trending topics across social media platforms',
  keywords: 'trends, social media, twitter trends, viral content',
  alternates: {
    canonical: 'https://yourdomain.com'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large'
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
    (function() {
      try {
        var savedTheme = localStorage.getItem('theme');
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = savedTheme !== null ? savedTheme === 'dark' : systemDark;
        if (theme) document.documentElement.classList.add('dark');
        // Sync with viewport theme-color
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.content = theme ? '#111827' : '#f9fafb';
      } catch (e) {}
    })();
  `
        }} />
        {/* Fallback for non-JS browsers */}
        <meta name="theme-color" content="#f9fafb" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          <main className="mt-16">
            {children}
          </main>
          <Footer />
          <FeedbackButton /> {/* Add this component here */}
        </ThemeProvider>
      </body>
    </html>
  )
}