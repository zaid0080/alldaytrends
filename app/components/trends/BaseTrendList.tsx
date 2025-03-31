'use client'

import { useEffect, useState } from 'react'
import { Trend } from '@/lib/hooks/useTrends'
import TrendCard from '@/components/TrendCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'

interface BaseTrendListProps {
  trends?: Trend[]       // New prop for controlled usage
  initialTrends?: Trend[] // Legacy prop for backward compatibility
  variant?: 'home' | 'detailed'
  loading?: boolean
  error?: string | null
  testId?: string
}

export default function BaseTrendList({ 
  trends: propTrends,      // Get trends from props
  initialTrends = [],      // Fallback for legacy usage
  variant = 'home',
  testId = 'trend-list'
}: BaseTrendListProps) {
  const [trends, setTrends] = useState<Trend[]>(initialTrends)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Only fetch updates if we have no initial data
    if (initialTrends.length === 0) {
      setLoading(true)
      fetch('/api/trends')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch trends')
          return res.json()
        })
        .then(data => {
          if (!data.trends) throw new Error('Invalid response format')
          setTrends(data.trends)
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [initialTrends.length])

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
      {loading ? (
        <LoadingSkeleton 
          count={variant === 'home' ? 3 : 6} 
          // Removed testId as it is not supported by LoadingSkeleton
        />
      ) : (
        trends.map((trend, index) => (
          <TrendCard 
            key={trend.id} 
            trend={{ ...trend, tweetVolume: trend.tweetVolume ?? 0 }}
            rank={index + 1}
            // Removed testId as it is not supported by TrendCard
          />
        ))
      )}
    </div>
  )
}