/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pna',
  assetPrefix: '/pna/',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
