/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/:path((?!sse$).*)',
        permanent: false,
        destination: '/sse/fetchData',
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/@in/:slug*',
        destination: '/:slug*',
      },
    ]
  },
}

module.exports = nextConfig
