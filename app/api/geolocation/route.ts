// app/api/geolocation/route.ts
import { NextResponse } from 'next/server';
import { getLocationFromIP } from '@/lib/geolocation';

export async function GET() {
  const country = await getLocationFromIP();
  return NextResponse.json(country || 'worldwide');
}