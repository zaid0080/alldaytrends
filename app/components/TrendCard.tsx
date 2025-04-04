'use client'

import { FiMinus, FiTrendingDown, FiTrendingUp } from 'react-icons/fi'
import { motion } from 'framer-motion'

interface Trend {
  id: number
  topic: string
  mentions: number
  tweetVolume: number
}

interface TrendCardProps {
  trend: Trend
  rank: number
}

export default function TrendCard({ trend, rank }: TrendCardProps) {
  const getRankColor = () => {
    switch(rank) {
      case 1: return 'from-yellow-400 to-amber-500'
      case 2: return 'from-gray-400 to-slate-500'
      case 3: return 'from-amber-600 to-orange-500'
      default: return 'from-indigo-400 to-blue-500'
    }
  }

  return (
    <motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ 
    once: false, // Changed from true to false
    margin: '100px 0px 100px 0px', // Increased margin
    amount: 'some' // Add this to trigger when any part is visible
  }}
  transition={{ duration: 0.3 }}
  whileHover={{ y: -3 }}
  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getRankColor()} 
            flex items-center justify-center text-white font-bold shadow-md`}>
            {rank}
          </div>
        </div>

        <h3 className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-100">
          #{trend.topic}
        </h3>

        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm py-2 px-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Mentions:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {trend.mentions.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between text-sm py-2 px-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <span className="text-gray-600 dark:text-gray-400">Tweet Volume:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {trend.tweetVolume.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}