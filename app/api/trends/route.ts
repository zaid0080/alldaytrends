import { NextResponse } from 'next/server'

// Centralized mock data for all locations
const MOCK_TRENDS_BY_LOCATION = {
  worldwide: [
    { id: 1, topic: "Global News", mentions: 50000, tweetVolume: 200000 },
    { id: 2, topic: "International Sports", mentions: 45000, tweetVolume: 180000 }
  ],
  india: [
    { id: 1, topic: "Bollywood Updates", mentions: 25000, tweetVolume: 120000 },
    { id: 2, topic: "Indian Politics", mentions: 30000, tweetVolume: 150000 },
    { id: 3, topic: "IPL Cricket", mentions: 40000, tweetVolume: 200000 }
  ],
  usa: [
    { id: 1, topic: "NBA Finals", mentions: 35000, tweetVolume: 160000 },
    { id: 2, topic: "US Elections", mentions: 40000, tweetVolume: 190000 },
    { id: 3, topic: "Tech Conferences", mentions: 30000, tweetVolume: 140000 }
  ],
  japan: [
    { id: 1, topic: "Anime Releases", mentions: 28000, tweetVolume: 130000 },
    { id: 2, topic: "Tech Innovations", mentions: 22000, tweetVolume: 110000 },
    { id: 3, topic: "Cherry Blossoms", mentions: 32000, tweetVolume: 150000 }
  ],
  // Cities data
  'india/delhi': [
    { id: 1, topic: "Delhi Elections", mentions: 15000, tweetVolume: 75000 },
    { id: 2, topic: "Delhi Air Quality", mentions: 18000, tweetVolume: 90000 }
  ],
  'usa/new-york': [
    { id: 1, topic: "NYC Events", mentions: 20000, tweetVolume: 100000 },
    { id: 2, topic: "Broadway Shows", mentions: 15000, tweetVolume: 80000 }
  ]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const place = searchParams.get('place') || 'worldwide'
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // Find matching trends or fallback to worldwide
    const trends = MOCK_TRENDS_BY_LOCATION[place.toLowerCase() as keyof typeof MOCK_TRENDS_BY_LOCATION] || 
                  MOCK_TRENDS_BY_LOCATION['worldwide']
    
    return NextResponse.json({ trends })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trends', trends: [] },
      { status: 500 }
    )
  }
}