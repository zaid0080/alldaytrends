// app/trends/[trendName]/page.tsx
import { notFound } from 'next/navigation'
import TrendDetails from '@/components/trends/TrendDetails'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { trendName: string }
}): Promise<Metadata> {
  const resolvedParams = await params;
  const trendName = decodeURIComponent(resolvedParams.trendName)
  
  return {
    title: `${trendName} Trends - TrendScope`,
    description: `Detailed analysis and statistics for ${trendName} social media trends`,
    openGraph: {
      title: `${trendName} Twitter Trends`,
      description: `Explore detailed trend analytics for ${trendName} across multiple locations`,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@alldaytrends1',
      title: `${trendName} Trend Analysis`,
      description: `Real-time analytics for ${trendName} social media trends`,
    },
  }
}

async function getTrendDetails(trendName: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/trends/${trendName}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          next: { revalidate: 3600 }
        }
      );
      
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
  
  export default async function TrendDetailsPage({
    params,
  }: {
    params: { trendName: string }
  }) {
    


    const resolvedParams = await params;
    const trendData = await getTrendDetails(resolvedParams.trendName)

    if (!trendData) return notFound()
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TrendDetails trend={trendData} trendName={resolvedParams.trendName} />
      </div>
    )
  }