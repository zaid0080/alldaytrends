import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const timestamp = searchParams.get('timestamp')

// export async function GET() {
  const mockTrends = [
    {
      id: 1,
      topic: "Retro Gaming",
      mentions: 12453,
      tweetVolume: 45200
    },
    {
      id: 2,
      topic: "Bollywood Nostalgia",
      mentions: 9876,
      tweetVolume: 32100
    },
    {
      id: 3,
      topic: "Desi Memes",
      mentions: 15432,
      tweetVolume: 67800
    },
    {
      id: 4,
      topic: "Tech Layoffs",
      mentions: 8765,
      tweetVolume: 28900
    },
    {
      id: 5,
      topic: "AI Art",
      mentions: 23456,
      tweetVolume: 102400
    },
    {
      id: 6,
      topic: "Climate Change",
      mentions: 6543,
      tweetVolume: 18700
    }
  ]


  // Filter/transform based on timestamp if needed
  const trends = timestamp 
    ? mockTrends.map(trend => ({
        ...trend,
        topic: `${trend.topic} at ${new Date(timestamp).getHours()}:00`
      }))
    : mockTrends

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return NextResponse.json({ trends }) // Wrap in object

}