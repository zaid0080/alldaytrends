// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getLocationFromIP } from '@/lib/geolocation'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Only process root requests
  if (path !== '/') return NextResponse.next()

  try {
    const detectedCountry = (await getLocationFromIP(request)) || 'worldwide'
    const normalizedCountry = detectedCountry.toLowerCase()

    // Always redirect to country path
    const url = request.nextUrl.clone()
    url.pathname = `/${normalizedCountry}`
    
    const response = NextResponse.redirect(url)
    response.cookies.set('geo-country', normalizedCountry, {
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax'
    })
    
    return response

  } catch (error) {
    return NextResponse.redirect(new URL('/worldwide', request.url))
  }
}

export const config = {
  matcher: '/',
}