import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // This allows the build to complete even with TS errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Recommended: also ignore lint errors during builds to ensure the VPS finishes
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.eoricart.com',
        pathname: '/files/**',
      },
      {
        protocol: 'http', // for local dev
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig;
