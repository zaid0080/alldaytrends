import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [64, 96, 128, 256, 384],
  },

  // 2. Fine-Tuned Header Optimizations
  async headers() {
    return [
      {
        // Preconnect and preload critical assets
        source: '/',
        headers: [
          {
            key: 'Link',
            value: [
              // Preconnect to CDN
              '<link rel="preconnect" href="https://flagcdn.com" crossorigin>',
              '<link rel="dns-prefetch" href="https://flagcdn.com">',

              // Preload most common flags in modern format
              '<link rel="preload" href="https://flagcdn.com/24x18/us.png" as="image" fetchpriority="high">',
              '<link rel="preload" href="https://flagcdn.com/24x18/gb.png" as="image">',
              '<link rel="preload" href="https://flagcdn.com/24x18/ca.png" as="image">',
            ].join(', '),
          },
        ],
      },
    ]
  },

  // 3. Webpack Configuration
  webpack: (config, { isServer }) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'),
    }
    return config
  }
}

export default nextConfig