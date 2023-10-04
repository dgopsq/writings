/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: false,
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    typedRoutes: true,
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config
  },
}
