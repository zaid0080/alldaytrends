'use client'

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'
import { motion } from 'framer-motion'
import CountrySearch from './CountrySearch'
import Image from 'next/image'

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-sm fixed w-full top-0 z-50 transition-colors duration-200 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Desktop Logo - hidden on mobile */}
            <div className="hidden md:block">
              <Image
                src="/website-logo.png"
                alt="AllDayTrends Logo"
                width={200}
                height={60} 
                priority 
              />
            </div>
            {/* Mobile Logo - hidden on desktop */}
            <div className="md:hidden">
              <Image
                src="/website-logo.png"
                alt="AllDayTrends Logo"
                width={140}
                height={40}
                priority 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/trends"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 transition-colors duration-200 text-sm font-medium"
            >
              Trends
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 transition-colors duration-200 text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 transition-colors duration-200 text-sm font-medium"
            >
              FAQ
            </Link>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <CountrySearch />
            </div>
            <div className="md:hidden">
              <CountrySearch />
            </div>
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <FiSun className="h-6 w-6 text-yellow-400" />
              ) : (
                <FiMoon className="h-6 w-6 text-gray-600" />
              )}
            </motion.button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <FiMenu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 transition-all duration-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/trends"
                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Trends
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  )
}