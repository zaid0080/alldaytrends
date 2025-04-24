export default function Footer() {
  return (
    <div className="bg-gray-800 dark:bg-gray-900 w-full"> {/* Changed to w-full */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white dark:text-gray-100 font-semibold mb-4">Alldaytrends</h3>
            <p className="text-sm dark:text-gray-400">
              Tracking real-time social media trends across platforms
            </p>
          </div>
          
          <div>
            <h4 className="text-white dark:text-gray-100 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/trends" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Trends</a></li>
              <li><a href="/about" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">About</a></li>
              <li><a href="/faq" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white dark:text-gray-100 font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-sm dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} TrendScope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}