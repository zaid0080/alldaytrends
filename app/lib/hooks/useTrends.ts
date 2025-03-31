'use client'
import { useState, useEffect } from 'react'

export interface Trend {
  id: number
  topic: string
  mentions: number
  tweetVolume?: number
}

interface UseTrendsOptions {
  initialData?: Trend[]
  refreshInterval?: number
}

export default function useTrends(options: UseTrendsOptions = {}) {
  const {
    initialData = [],
    refreshInterval = 0 // Default no refresh
  } = options

  const [trends, setTrends] = useState<Trend[]>(initialData)
  const [loading, setLoading] = useState(!initialData.length)
  const [error, setError] = useState<string | null>(null)

  const fetchTrends = async (abortController?: AbortController) => {
    try {
      setLoading(true)
      const response = await fetch('/api/trends', {
        signal: abortController?.signal
      })
      if (!response.ok) throw new Error('Failed to fetch trends')
      const data = await response.json()
      setTrends(data.trends || data)
      setError(null)
    } catch (err) {
      if (!abortController?.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    } finally {
      if (!abortController?.signal.aborted) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (initialData.length === 0) {
      const abortController = new AbortController()
      fetchTrends(abortController)
      return () => abortController.abort()
    }
  }, [initialData.length])

  useEffect(() => {
    if (refreshInterval > 0) {
      const interval = setInterval(fetchTrends, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [refreshInterval])

  return { trends, loading, error, refresh: fetchTrends }
}