/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables React's strict mode for catching potential issues
  swcMinify: true, // Enables SWC for faster builds and smaller bundle sizes
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'uploadlink.vercel.app',
          },
        ],
        destination: 'https://uploadlink.xyz/:path*', // Replace with your primary domain
        permanent: true, // Set as permanent (301) redirect
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.uploadlink.xyz', // Example environment variable
  },
};

export default nextConfig;
