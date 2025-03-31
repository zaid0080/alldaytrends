import React from 'react'

interface LoadingSkeletonProps {
  count?: number
}

export default function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className="bg-gray-200 dark:bg-gray-700 rounded-lg p-6 animate-pulse"
        >
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        </div>
      ))}
    </>
  )
}