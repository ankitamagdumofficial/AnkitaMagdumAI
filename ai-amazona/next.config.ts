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
  
  // Skip validation during build if needed (for Netlify)
  eslint: {
    ignoreDuringBuilds: process.env.SKIP_ENV_VALIDATION === 'true',
  },
  
  typescript: {
    ignoreBuildErrors: process.env.SKIP_ENV_VALIDATION === 'true',
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
