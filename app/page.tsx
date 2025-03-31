import HeroSection from '@/components/HeroSection'
import AnimationWrapper from './components/AnimationWrapper'
import TrendContainer from '@/components/trends/TrendContainer'
import BaseTrendList from '@/components/trends/BaseTrendList'

async function getTrends() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''
    const res = await fetch(`${baseUrl}/api/trends`, {
      next: { revalidate: 3600 }
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    // Add validation for response format
    if (!data.trends || !Array.isArray(data.trends)) {
      throw new Error('Invalid API response format')
    }

    return data
  } catch (error) {
    console.error('Failed to fetch trends:', error)
    return { trends: [] }
  }
}

export default async function Home() {
  const { trends } = await getTrends()

  return (
    <main className="mt-16">
      <AnimationWrapper
        yOffset={40}
        duration={0.6}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700"
      >
        <HeroSection />
      </AnimationWrapper>

      <TrendContainer title="Trending Now">
        <BaseTrendList
          initialTrends={trends}
          variant="home"
          testId="home-trends" // For easier testing
        />
      </TrendContainer>
    </main>
  )
}