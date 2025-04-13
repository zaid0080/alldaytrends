export interface Trend {
    id: number
    topic: string
    mentions: number
    tweetVolume: number
  }


  export interface TrendDetail {
    name: string
    defaultLocation: string
    locations: Array<{
      name: string
      rank: number
      tweetVolume: number
      coordinates: [number, number]
    }>
  }  