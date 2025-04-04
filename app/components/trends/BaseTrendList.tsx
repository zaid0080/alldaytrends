'use client'

import { useEffect, useState } from 'react'
import { Trend } from '@/lib/hooks/useTrends'
import TrendCard from '@/components/TrendCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface BaseTrendListProps {
  trends?: Trend[]
  initialTrends?: Trend[]
  variant?: 'home' | 'detailed'
  loading?: boolean
  error?: string | null
  testId?: string
  skeletonCount?: number // Add this prop
}

export default function BaseTrendList({ 
  trends: propTrends,
  initialTrends = [],
  variant = 'home',
  loading = false, // Make sure this is properly passed
  error = null,
  testId = 'trend-list',
  skeletonCount = variant === 'home' ? 3 : 6 // Default values
}: BaseTrendListProps) {
  const [trends, setTrends] = useState<Trend[]>(initialTrends)
  const [internalLoading, setInternalLoading] = useState(false)

  useEffect(() => {
    if (propTrends) {
      setTrends(propTrends)
    } else if (initialTrends.length === 0) {
      setInternalLoading(true)
      fetch('/api/trends')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch trends')
          return res.json()
        })
        .then(data => {
          if (!data.trends) throw new Error('Invalid response format')
          setTrends(data.trends)
        })
        .catch(err => error || setError(err.message))
        .finally(() => setInternalLoading(false))
    }
  }, [propTrends, initialTrends.length, error])

  const isLoading = loading || internalLoading

  if (error) {
    return (
      <div 
        className="text-red-500 dark:text-red-400 p-4 rounded bg-red-50 dark:bg-red-900/20"
        data-testid={`${testId}-error`}
      >
        Error: {error}
      </div>
    )
  }

  return (
    <div 
      className={`grid gap-6 ${
        variant === 'home' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}
      data-testid={testId}
    >
      {isLoading ? (
        Array.from({ length: skeletonCount }).map((_, i) => (
          <LoadingSkeleton key={`skeleton-${i}`} />
        ))
      ) : (
        trends.map((trend, index) => (
          <TrendCard 
            key={`${trend.id}-${index}`} 
            trend={{ ...trend, tweetVolume: trend.tweetVolume ?? 0 }}
            rank={index + 1}
          />
        ))
      )}
    </div>
  )
}

function setError(message: any): any {
  throw new Error('Function not implemented.')
}
