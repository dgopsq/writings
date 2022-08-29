const path = require('path')
const fs = require('fs')

module.exports = {
  trailingSlash: false,
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,

  webpack(config) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    return config
  },
}
