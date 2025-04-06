// app/[country]/page.tsx
import TrendContainer from '@/components/trends/TrendContainer'
import BaseTrendList from '@/components/trends/BaseTrendList'
import CountrySearch from '@/components/CountrySearch'
import { notFound } from 'next/navigation'
import AnimationWrapper from '@/components/AnimationWrapper'
import HeroSection from '@/components/HeroSection'
import { decodeRouteParam } from '@/utils/route-params'

async function getTrends(place: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/trends?place=${place}`)
    if (!res.ok) throw new Error('Failed to fetch trends')
    return await res.json()
  } catch (error) {
    console.error('Trends fetch failed:', error)
    return { trends: [] }
  }
}

export default async function CountryPage(
  props: {
      params: Promise<{ country: string }>,
      trends: any
  }
) {
  const params = await props.params;
  // First validate params exists
  if (!params?.country) {
    return notFound()
  }

  // Then decode the parameter
  const country = decodeRouteParam(params.country)

  // Fetch data
  const { trends } = await getTrends(country)

  return (
    <main className="mt-16">
      <AnimationWrapper
        yOffset={40}
        duration={0.6}
        className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:from-indigo-600 dark:to-blue-700"
      >
        <HeroSection />
      </AnimationWrapper>
      <TrendContainer
        title={`Trends in ${country}`}
      >
        <BaseTrendList
          initialTrends={trends}
          variant="detailed"
          testId="location-trends"
        />
      </TrendContainer>
    </main>
  )
}