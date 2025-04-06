// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getLocationFromIP } from '@/lib/geolocation';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') return;

  try {
    const detectedCountry = await getLocationFromIP(request) || 'worldwide';
    const url = request.nextUrl.clone();
    url.pathname = `/${detectedCountry.toLowerCase()}`;

    const response = NextResponse.redirect(url);
    
    // Set cookie for client-side consistency
    response.cookies.set('geo-country', detectedCountry, {
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    const url = request.nextUrl.clone();
    url.pathname = '/worldwide';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '/',
  runtime: 'experimental-edge',
};