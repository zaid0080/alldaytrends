// components/trends/TrendContainer.tsx
'use client'

import { ReactNode } from 'react'

interface TrendContainerProps {
  title: string
  children: ReactNode
  headerAction?: ReactNode
  fullWidth?: boolean
  background?: string
}

export default function TrendContainer({
  title,
  children,
  headerAction,
  fullWidth = false,
  background = 'bg-white dark:bg-gray-900'
}: TrendContainerProps) {
  return (
    <div className={`w-full ${background} ${fullWidth ? '' : 'max-w-8xl mx-auto'} px-4 sm:px-6 lg:px-8 py-12`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {headerAction}
      </div>
      {children}
    </div>
  )
}