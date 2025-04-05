// app/[country]/[city]/page.tsx
import { notFound } from 'next/navigation'
import CountryPage from '../page'
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

export default async function CityPage(
  props: { 
    params: Promise<{ country: string; city: string }>
  }
) {
  const params = await props.params;
  if (!params?.country || !params?.city) {
    return notFound()
  }

  // Decode parameters first
  const country = decodeRouteParam(params.country)
  const city = decodeRouteParam(params.city)
  const location = `${country}/${city}`
  const { trends } = await getTrends(location)

  return (
    <CountryPage
      params={Promise.resolve({ 
        country: location // Pass the full location path
      })}
      trends={trends} // Pass trends as a separate prop
    />
  )
}