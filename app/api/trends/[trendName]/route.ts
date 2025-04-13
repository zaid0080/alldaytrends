// app/api/trends/[trendName]/route.ts
import { NextResponse } from 'next/server'

// Shared mock data structure
const MOCK_TRENDS_DATA = {
  // Worldwide trends
  "Global News": {
    name: "Global News",
    defaultLocation: "United States",
    locations: [
      {
        name: "United States",
        rank: 1,
        tweetVolume: 200000,
        coordinates: [-100, 40],
        mentions: 50000
      },
      {
        name: "India",
        rank: 3,
        tweetVolume: 120000,
        coordinates: [78, 21],
        mentions: 25000
      }
    ]
  },
  "Bollywood Updates": {
    name: "Bollywood Updates",
    defaultLocation: "India",
    locations: [
      {
        name: "India",
        rank: 1,
        tweetVolume: 150000,
        coordinates: [78, 21],
        mentions: 30000
      },
      {
        name: "United States",
        rank: 5,
        tweetVolume: 80000,
        coordinates: [-100, 40],
        mentions: 15000
      }
    ]
  },
  "NBA Finals": {
    name: "NBA Finals",
    defaultLocation: "United States",
    locations: [
      {
        name: "United States",
        rank: 1,
        tweetVolume: 160000,
        coordinates: [-100, 40],
        mentions: 35000
      },
      {
        name: "China",
        rank: 4,
        tweetVolume: 90000,
        coordinates: [104, 35],
        mentions: 20000
      }
    ]
  }
}

export const dynamic = 'force-dynamic'

export async function GET(
    request: Request,
    { params }: { params: { trendName: string } }
  ) {
    try {
      const trendName = decodeURIComponent(params.trendName);
      console.log('Trend Name in route ts', trendName)
      // Find mock data using decoded name
      const trendData = MOCK_TRENDS_DATA[trendName as keyof typeof MOCK_TRENDS_DATA] || {
        name: trendName,
        defaultLocation: "Worldwide",
        locations: [{
          name: "Worldwide",
          rank: 0,
          tweetVolume: 0,
          coordinates: [0, 0],
          mentions: 0
        }]
      }
  
      return NextResponse.json(trendData);
  } catch (error) {
    console.error('Error fetching trend details:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch trend details',
        trends: []
      },
      { status: 500 }
    )
  }
}




// Uncomment this for real API call
/*
const backendUrl = process.env.TRENDS_API_URL || 'https://trendsend.herokuapp.com/apis/trends/trend-details'
const response = await fetch(backendUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ trend: trendName }),
})
if (!response.ok) throw new Error(`Backend responded with ${response.status}`)
const data = await response.json()
*/