import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover What's Trending Worldwide
        </h1>
        <p className="text-xl text-indigo-100 mb-8">
          Real-time social media trends from multiple platforms
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/trends"
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Explore Trends
          </Link>
        </div>
      </div>
    </div>
  )
}