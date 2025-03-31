// components/TimelineSelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { format, startOfDay, addHours, isToday } from 'date-fns'

interface TimelineSelectorProps {
  onTimeSelect: (date: Date) => void
}

export default function TimelineSelector({ onTimeSelect }: TimelineSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours())
  const [hours, setHours] = useState<Date[]>([])

  useEffect(() => {
    const start = startOfDay(selectedDate)
    const hoursArray = Array.from({ length: 24 }, (_, i) => addHours(start, i))
    setHours(hoursArray)
  }, [selectedDate])

  const handleDateChange = (date: string) => {
    const newDate = new Date(date)
    setSelectedDate(newDate)
    setSelectedHour(0)
    onTimeSelect(startOfDay(newDate))
  }

  const handleHourClick = (hour: Date) => {
    setSelectedHour(hour.getHours())
    onTimeSelect(hour)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Date Picker */}
      <div className="flex items-center space-x-4">
        <input
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => handleDateChange(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {isToday(selectedDate) ? 'Today' : format(selectedDate, 'MMM d, yyyy')}
        </span>
      </div>

      {/* Hour Timeline */}
      <div className="relative overflow-x-auto pb-4">
        <div className="flex space-x-4">
          {hours.map((hour) => (
            <button
              key={hour.toString()}
              onClick={() => handleHourClick(hour)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm transition-colors
                ${hour.getHours() === selectedHour
                  ? 'bg-blue-500 text-white dark:bg-blue-600'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
            >
              {format(hour, 'ha')}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}