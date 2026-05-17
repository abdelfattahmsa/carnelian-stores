import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Turbopack is default in Next.js 16 — no flag needed.
  // Only add turbopack config if you have custom resolver needs.

  // React Compiler (optional, stable in Next.js 16)
  // reactCompiler: true,
}

export default nextConfig
