/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/omni-route',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
