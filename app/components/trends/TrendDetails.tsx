'use client'

import { useState } from 'react'
import { FiHash, FiTrendingUp, FiMapPin, FiGlobe } from 'react-icons/fi'
import { TrendDetail } from '@/lib/types'


interface TrendDetailsProps {
  trend: TrendDetail
  trendName: string
}

export default function TrendDetails({ trend, trendName }: TrendDetailsProps) {
  const [selectedLocation, setSelectedLocation] = useState(trend.defaultLocation)
  const currentTrend = trend.locations.find(l => l.name === selectedLocation)

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <FiHash className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          #{trendName}
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <FiGlobe className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Global Trend Distribution</h2>
        </div>
      </div>
    </div>
  )
}