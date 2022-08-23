module.exports = {
  trailingSlash: false,
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,

  webpack(config, { isServer }) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true }

    return config
  },
}
