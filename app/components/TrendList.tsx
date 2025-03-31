'use client'

import { Trend } from '@/lib/types'
import TrendCard from './TrendCard'
import LoadingSkeleton from './LoadingSkeleton'

interface TrendListProps {
  trends: Trend[]
  loading: boolean
  error?: string
}

export default function TrendList({ trends = [], loading = false, error }: TrendListProps) {
  if (error) return (
    <div className="text-red-500 dark:text-red-400 p-4 rounded bg-red-50 dark:bg-red-900/20">
      Error loading trends: {error}
    </div>
  )
  
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {/* {loading ? (
        <LoadingSkeleton count={6} />
      ) : trends.length > 0 ? (
        trends.map((trend: Trend, index: number) => (
          <TrendCard key={trend.id} trend={trend} rank={index + 1} />
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          No trends available for this time period
        </div>
      )} */}
    </div>
  )
}