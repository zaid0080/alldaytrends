// components/TimelineSelector.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import { format, startOfDay, addHours, isToday, subMonths, isSameHour } from 'date-fns'

interface TimelineSelectorProps {
  onTimeSelect: (date: Date) => void
}

export default function TimelineSelector({ onTimeSelect }: TimelineSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedHour, setSelectedHour] = useState<Date>(new Date())
  const [hours, setHours] = useState<Date[]>([])
  const initialLoad = useRef(true)

  // Calculate date range
  const minDate = format(subMonths(new Date(), 1), 'yyyy-MM-dd')
  const maxDate = format(new Date(), 'yyyy-MM-dd')

  // Generate hours for display
  useEffect(() => {
    const start = startOfDay(selectedDate)
    let hoursArray: Date[] = []
    
    if (isToday(selectedDate)) {
      const now = new Date()
      const currentHour = now.getHours()
      hoursArray = Array.from({ length: currentHour + 1 }, (_, i) => addHours(start, i)).reverse()
    } else {
      hoursArray = Array.from({ length: 24 }, (_, i) => addHours(start, i))
    }
    
    setHours(hoursArray)
    
    // Set initial selection (only on first load or date change)
    if (initialLoad.current || !isToday(selectedDate)) {
      const initialSelection = isToday(selectedDate) ? new Date() : start
      setSelectedHour(initialSelection)
      onTimeSelect(initialSelection)
      initialLoad.current = false
    }
  }, [selectedDate]) // Removed onTimeSelect from dependencies

  const handleDateChange = (date: string) => {
    const newDate = new Date(date)
    setSelectedDate(newDate)
  }

  const handleHourClick = (hour: Date) => {
    setSelectedHour(hour)
    onTimeSelect(hour) // Only call API when user explicitly selects an hour
  }

  const formatHourLabel = (hour: Date) => {
    if (!isToday(selectedDate)) return format(hour, 'ha')
    
    const now = new Date()
    const hourDiff = now.getHours() - hour.getHours()
    
    if (hourDiff === 0) return 'Now'
    return `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ago`
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="date"
          min={minDate}
          max={maxDate}
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => handleDateChange(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        />
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM d, yyyy')}
        </span>
      </div>

      <div className="relative overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {hours.map((hour) => (
            <button
              key={hour.toString()}
              onClick={() => handleHourClick(hour)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-colors font-medium
                ${isSameHour(hour, selectedHour)
                  ? 'bg-blue-600 text-white dark:bg-blue-700 dark:text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
            >
              {formatHourLabel(hour)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}