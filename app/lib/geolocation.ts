// lib/geolocation.ts
import type { NextRequest } from 'next/server';

// Cache results for 6 hours (more reasonable duration)
const GEO_CACHE_TTL = 6 * 60 * 60 * 1000;
const CACHE_KEY = 'geoCache_v2'; // Versioned cache key

export async function getLocationFromIP(req?: NextRequest) {
  try {
    // 1. First try Vercel's geolocation headers
    if (process.env.VERCEL === '1') {
      const vercelCountry = req?.headers.get('x-vercel-ip-country')?.toLowerCase() || 
                          process.env.VERCEL_GEOLOCATION_COUNTRY?.toLowerCase();
      
      if (vercelCountry) {
        return vercelCountry;
      }
    }

    // 2. Fallback to ipapi.co with proper error handling
    const response = await fetch('https://ipapi.co/json/', {
      headers: {
        'User-Agent': 'alldaytrends.in' // Some APIs require user-agent
      }
    });

    if (!response.ok) {
      throw new Error(`IPAPI request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.country_name?.toLowerCase() || 'worldwide';
    
  } catch (error) {
    console.error('Geolocation failed:', error);
    return 'worldwide'; // Default to worldwide instead of null
  }
}

// Client-side version with improved caching
export async function getClientGeolocation() {
  try {
    // 1. Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { country, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < GEO_CACHE_TTL) {
        return country || 'worldwide';
      }
    }

    // 2. Fetch fresh data
    const response = await fetch('/api/geolocation');
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const country = await response.json() || 'worldwide';
    
    // 3. Update cache
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      country,
      timestamp: Date.now()
    }));
    
    return country;
    
  } catch (error) {
    console.error('Client geolocation failed:', error);
    
    // 4. Fallback to expired cache if available
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { country } = JSON.parse(cached);
      return country || 'worldwide';
    }
    
    return 'worldwide';
  }
}