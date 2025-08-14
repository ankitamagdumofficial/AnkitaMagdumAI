import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features for better hydration
  experimental: {
    // Helps with hydration mismatches
    optimizePackageImports: ['@radix-ui/react-avatar', '@radix-ui/react-dropdown-menu'],
  },
  
  // Compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Always ignore build errors during Netlify build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Headers for better browser extension compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
