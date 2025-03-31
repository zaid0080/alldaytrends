import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove experimental.appDir as it's no longer needed in newer Next.js versions
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'),
    }
    return config
  }
}

export default nextConfig