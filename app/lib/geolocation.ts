// lib/geolocation.ts
export async function getLocationFromIP() {
    try {
      if (process.env.VERCEL === '1') {
        return process.env.VERCEL_GEOLOCATION_COUNTRY?.toLowerCase() || null
      }

      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return data.country_name?.toLowerCase() || null
    } catch (error) {
      console.error('Geolocation failed:', error)
      return null
    }
  }