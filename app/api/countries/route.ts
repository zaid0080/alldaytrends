import { NextResponse } from 'next/server'

export async function GET() {
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'IN', name: 'India' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' }
  ]
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return NextResponse.json(countries)
}