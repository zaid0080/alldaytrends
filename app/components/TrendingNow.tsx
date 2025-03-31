'use client'

import { useState, useEffect } from 'react'
import TrendCard from './TrendCard'
import LoadingSkeleton from './LoadingSkeleton'
import TimelineSelector from './TimelineSelector'

interface Trend {
  id: number
  topic: string
  mentions: number
  tweetVolume: number
}

interface TrendingNowProps {
  showTimeline?: boolean
}

export default function TrendingNow({ showTimeline = false }: TrendingNowProps) {
  const [trends, setTrends] = useState<Trend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<Date>(new Date())

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const url = showTimeline 
          ? `/api/trends?timestamp=${selectedTime.toISOString()}`
          : '/api/trends'
        
        const response = await fetch(url)
        const data = await response.json()
        setTrends(data.trends)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch trends')
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
  }, [showTimeline, selectedTime])

  const handleTimeSelect = (time: Date) => {
    setSelectedTime(time)
  }

  if (error) return (
    <div className="text-red-500 dark:text-red-400 p-4 rounded bg-red-50 dark:bg-red-900/20">
      Error loading trends: {error}
    </div>
  )

  return (
    <>
      {showTimeline && (
        <div className="mb-8">
          <TimelineSelector onTimeSelect={handleTimeSelect} />
        </div>
      )}
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <LoadingSkeleton count={showTimeline ? 6 : 3} />
        ) : (
          trends.map((trend, index) => (
            <TrendCard key={trend.id} trend={trend} rank={index + 1} />
          ))
        )}
      </div>
    </>
  )
}