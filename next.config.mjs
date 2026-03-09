/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pna',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
