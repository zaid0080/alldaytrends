// app/about/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About alldaytrends - Twitter Trends Analysis Platform',
  description: 'Discover trending Twitter hashtags and topics worldwide. AllDayTrends provides real-time and historical Twitter trend data for 400+ locations without needing an account.',
  keywords: [
    'Twitter trends',
    'trending hashtags',
    'social media trends',
    'Twitter analytics',
    'worldwide trends',
    'trend analysis'
  ],
  twitter: {
    title: 'About AllDayTrends | Twitter Trend Analysis Platform',
    description: 'Track trending Twitter topics globally with AllDayTrends. Access real-time and historical data for 400+ locations.',
    card: 'summary_large_image',
    site: '@alldaytrends1',
    creator: '@alldaytrends1'
  },
  openGraph: {
    title: 'About AllDayTrends - Twitter Trends Analysis Platform',
    description: 'Discover trending Twitter hashtags and topics worldwide with our comprehensive trend analysis tools.',
    url: 'https://alldaytrends.in/about',
    type: 'website',
    siteName: 'AllDayTrends',
  },
  alternates: {
    canonical: 'https://alldaytrends.in/about',
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 dark:text-indigo-400">
          About <span className="text-indigo-600 dark:text-indigo-400">AllDayTrends</span>
        </h1>
        
        <div className="mb-8 mx-auto w-full max-w-md">
          <Image
            src="Trends.svg"
            alt="Twitter Trends Analysis Illustration"
            width={500}
            height={300}
            className="w-full h-auto dark:invert-[80%] dark:hue-rotate-180" // SVG styling for dark mode
            priority
          />
        </div>

        <div className="space-y-6 text-base md:text-lg leading-relaxed">
          <p>
            When you need to boost your social media presence, staying updated with <span className="font-semibold text-indigo-600 dark:text-indigo-400">Twitter trends worldwide</span> is essential. 
            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> AllDayTrends</span> is your comprehensive solution for real-time and historical trend analysis.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Key Features:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Track trends across <span className="font-medium">400+ countries and cities</span></li>
              <li>24-hour historical trend data</li>
              <li>No Twitter account required</li>
              <li>Responsive design for all devices</li>
              <li>Dark mode support</li>
            </ul>
          </div>

          <p>
            Our platform collects and analyzes <span className="font-semibold text-indigo-600 dark:text-indigo-400">Twitter trends</span> to provide valuable insights, helping you stay ahead of the conversation and understand what's capturing global attention.
          </p>

          <p>
            While Twitter shows trending topics in its app, the constantly changing nature makes it difficult to track trends over time or monitor multiple locations. <span className="font-semibold text-indigo-600 dark:text-indigo-400">AllDayTrends</span> solves this by offering both current and historical trend data for major locations worldwide.
          </p>

          <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-lg border border-indigo-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-indigo-800 dark:text-indigo-400">Why Use AllDayTrends?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-medium">Content creators:</span> Discover viral topics to engage with</li>
              <li><span className="font-medium">Marketers:</span> Identify trending conversations for campaigns</li>
              <li><span className="font-medium">Researchers:</span> Analyze social media trends over time</li>
              <li><span className="font-medium">Journalists:</span> Spot breaking news and emerging stories</li>
            </ul>
          </div>

          <p>
            We provide <span className="font-semibold text-indigo-600 dark:text-indigo-400">trending Twitter hashtags</span> with detailed analytics, helping you understand not just what's trending, but also the context behind each trend.
          </p>

          <p className="text-center py-4 border-t border-gray-200 dark:border-gray-700 mt-6">
            <span className="font-semibold">AllDayTrends</span> is completely free to use and accessible to everyone, whether you have a Twitter account or not.
          </p>
        </div>
      </div>
    </div>
  )
}