/** @type {import('next').NextConfig} */
export default {
  trailingSlash: false,
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    typedRoutes: true,
    mdxRs: false,
  },

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config
  },
}
