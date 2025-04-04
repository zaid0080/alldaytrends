// app/not-found.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full text-center">
        {/* Error Image */}
        <div className="mx-auto w-full max-w-xs">
          <Image
            src="/404Error.png"
            alt="404 Error"
            width={500}
            height={350}
            className="w-full h-auto dark:invert-[80%]"
            priority
          />
        </div>

        {/* Error Message */}
        <h1 className="mt-8 text-4xl font-bold text-gray-900 dark:text-white">
          OOPS! <span className="text-indigo-600 dark:text-indigo-400">404 ERROR</span>
        </h1>
        
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          The page you requested was not found!
        </p>

        {/* Home Redirect Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            Return to Homepage
          </Link>
        </div>

        {/* Trending Suggestions */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Check out what's trending right now:
          </p>
          <Link
            href="/trends"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-100 dark:bg-indigo-800 dark:hover:bg-indigo-700 transition-colors duration-200"
          >
            Explore Latest Trends →
          </Link>
        </div>
      </div>
    </div>
  )
}