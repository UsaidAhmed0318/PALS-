import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
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
