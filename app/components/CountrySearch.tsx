'use client'

import { useState, useEffect, useRef } from 'react'
import { FiSearch, FiX, FiChevronDown } from 'react-icons/fi'
import countriesData from '@/data/countries.json'
import Head from 'next/head'

interface Country {
  code: string
  name: string // City/region name
  woeid: number
  country: string // Country name
}

export default function CountrySearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const formattedCountries = countriesData.map(country => ({
          code: country.countryCode ?? '',
          name: country.name,
          woeid: country.woeid,
          country: country.country
        }));
        setCountries(formattedCountries); // Always load countries first

        // Now check sessionStorage
        const savedCountry = sessionStorage.getItem("country");
        if (savedCountry) {
          try {
            const parsedCountry = JSON.parse(savedCountry);
            // Validate the saved country exists in our data
            const isValid = formattedCountries.some(c => c.woeid === parsedCountry.woeid);
            setSelectedCountry(isValid ? parsedCountry : formattedCountries[0]);
          } catch {
            setSelectedCountry(formattedCountries[0]);
          }
        } else {
          // Only detect location if no saved country
          await detectUserLocation(formattedCountries);
        }
      } catch (error) {
        console.error('Failed to load countries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const detectUserLocation = async (countriesList: Country[]) => {
      try {
        const resp = await fetch("https://ipapi.co/json/");
        const data = await resp.json();
        const userCountryName = data.country_name;

        const matchedCountry = countriesList.find(c =>
          c.name.toLowerCase() === userCountryName.toLowerCase()
        );

        setSelectedCountry(matchedCountry || countriesList[0]);
        sessionStorage.setItem("country", JSON.stringify(matchedCountry || countriesList[0]));
      } catch (error) {
        console.error('Location detection failed:', error);
        setSelectedCountry(countriesList[0]);
      }
    };

    setIsLoading(true);
    loadCountries();
  }, []);

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
      setSearchTerm('')
    }
  }, [isOpen])

  // Update your filteredCountries logic to:
  const filteredCountries = countries
    .filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.country.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // Ensure "Worldwide" is always on top if no search term is entered
      if (!searchTerm) {
        if (a.name === "Worldwide") return -1;
        if (b.name === "Worldwide") return 1;
      }

      // Prioritize countries over cities
      if (a.name === a.country && b.name !== b.country) return -1;
      if (a.name !== a.country && b.name === b.country) return 1;

      // If both are countries or both are cities, sort alphabetically
      return a.name.localeCompare(b.name);
    });

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://flagcdn.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
      </Head>

      <div className="relative">
        {/* Country Selector Button - Shows selected city/region name */}
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
              {selectedCountry?.name !== "Worldwide" ? (<div
                className="w-5 h-3.5 md:w-6 md:h-4 rounded bg-cover"
                style={{
                  backgroundImage: `url(https://flagcdn.com/24x18/${selectedCountry?.code?.toLowerCase()}.png)`
                }}
              ></div>) : null}
              <span className="font-medium text-xs md:text-sm text-gray-900 dark:text-gray-100">
                {selectedCountry?.name || 'Select'}
              </span>
              <FiChevronDown className="w-3 h-3 md:w-4 md:h-4 text-gray-700 dark:text-gray-300" />
            </>
          )}
        </button>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              ref={modalRef}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] overflow-hidden border-2 border-blue-300 dark:border-blue-700"
            >
              {/* Modal Header */}
              <div className="p-3 md:p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <h3 className="font-bold text-base md:text-lg text-gray-900 dark:text-gray-100">
                  Select Location
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
                    placeholder="Search cities or countries..."
                    className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-1 md:py-2 text-sm md:text-base rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Location List */}
              <div className="overflow-y-auto max-h-[60vh]">
                {filteredCountries.length > 0 ? (
                  <ul>
                    {filteredCountries.map((country) => (
                      <li key={country.woeid}>
                        <button
                          className={`
                          w-full text-left px-3 md:px-4 py-2 md:py-3 text-sm md:text-base
                          hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors 
                          ${selectedCountry?.woeid === country.woeid ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}
                        `}
                          onClick={() => {
                            setSelectedCountry(country)
                            setIsOpen(false)
                            setSearchTerm('')
                          }}
                        >
                          <div className="flex items-center gap-2 md:gap-3">
                            <div
                              className="w-5 h-3.5 md:w-6 md:h-4 rounded bg-cover"
                              style={{
                                backgroundImage: `url(https://flagcdn.com/24x18/${country.code?.toLowerCase()}.png)`
                              }}
                            ></div>
                            <div className="flex flex-col">
                              <span className="text-gray-900 dark:text-gray-100">{country.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {country.country}
                              </span>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-sm md:text-base text-gray-500 dark:text-gray-400">
                    No locations found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}