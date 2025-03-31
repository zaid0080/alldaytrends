'use client'

import TrendContainer from '@/components/trends/TrendContainer'
import BaseTrendList from '@/components/trends/BaseTrendList'
import TimelineSelector from '@/components/TimelineSelector'
import useTrends from '@/lib/hooks/useTrends'
import React from 'react'

export default function TrendsPage() {
  const { trends: initialTrends, loading, error, refresh } = useTrends({
    refreshInterval: 300000 // 5 minutes
  })
  const [trends, setTrends] = React.useState(initialTrends)

  const handleTimeSelect = (time: Date) => {
    fetch(`/api/trends?timestamp=${time.toISOString()}`)
      .then(res => res.json())
      .then(data => setTrends(data.trends))
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <TrendContainer title="Historical Trends">
        <div className="space-y-8">
        <TimelineSelector onTimeSelect={handleTimeSelect} />
          <BaseTrendList 
            trends={trends}
            loading={loading}
            error={error}
            variant="detailed"
          />
        </div>
      </TrendContainer>
    </main>
  )
}