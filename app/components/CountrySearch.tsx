'use client'

import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiX, FiChevronDown } from 'react-icons/fi'

export default function CountrySearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<{code: string, name: string} | null>(null)
  const [countries, setCountries] = useState<{code: string, name: string}[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const modalRef = useRef<HTMLDivElement>(null)

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('/api/countries')
        const data = await response.json()
        setCountries(data)
        setSelectedCountry(data[0]) // Default to first country
      } catch (error) {
        console.error('Failed to fetch countries:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCountries()
  }, [])

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative">
      {/* Country Selector Button - Smaller on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className={`
          flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-2 
          rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
          transition-colors border-2 border-blue-300 dark:border-blue-700
          ${isLoading ? 'opacity-70' : ''}
        `}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Loading...</span>
        ) : (
          <>
            <span className="font-medium text-xs md:text-sm text-gray-900 dark:text-gray-100">
              {selectedCountry?.name || 'Select'}
            </span>
            <FiChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" />
          </>
        )}
      </button>

      {/* Modal with thicker border */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden border-2 border-blue-300 dark:border-blue-700"
          >
            {/* Modal Header */}
            <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">
                Select Country
              </h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                <FiX className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-1 md:py-2 text-sm md:text-base rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Country List */}
            <div className="overflow-y-auto max-h-[60vh]">
              {filteredCountries.length > 0 ? (
                <ul>
                  {filteredCountries.map((country) => (
                    <li key={country.code}>
                      <button
                        className={`
                          w-full text-left px-3 md:px-4 py-2 md:py-3 text-sm md:text-base
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors 
                          ${selectedCountry?.code === country.code ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}
                        `}
                        onClick={() => {
                          setSelectedCountry(country)
                          setIsOpen(false)
                        }}
                      >
                        <div className="flex items-center gap-2 md:gap-3">
                          <span className={`fi fi-${country.code.toLowerCase()} w-5 h-3.5 md:w-6 md:h-4 rounded`}></span>
                          <span className="text-gray-900 dark:text-gray-100">{country.name}</span>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm md:text-base text-gray-500 dark:text-gray-400">
                  No countries found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}