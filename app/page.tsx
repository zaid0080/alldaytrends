import { redirect } from 'next/navigation'
import { getLocationFromIP } from '@/lib/geolocation'

export default async function Home() {
  const detectedCountry = await getLocationFromIP() || 'worldwide'
  redirect(`/${encodeURIComponent(detectedCountry.toLowerCase())}`)
}