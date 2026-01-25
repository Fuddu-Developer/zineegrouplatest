/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // For static image optimization
  },
  // Copy assets from assets folder to public during build if needed
}

module.exports = nextConfig
