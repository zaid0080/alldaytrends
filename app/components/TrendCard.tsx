'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

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
  // const router = useRouter()

  const getRankColor = () => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-amber-500'
      case 2: return 'from-gray-400 to-slate-500'
      case 3: return 'from-amber-600 to-orange-500'
      default: return 'from-indigo-400 to-blue-500'
    }
  }

  return (
    <Link href={`/trends/${encodeURIComponent(trend.topic)}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: Math.min(0.1 * rank, 0.3),
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ y: -3 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
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
    </Link>
  )
}