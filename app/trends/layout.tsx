import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Current Trends - TrendScope',
  description: 'Explore the latest trending topics',
}

export default function TrendsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {children}
    </div>
  )
}