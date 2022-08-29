const path = require('path')
const fs = require('fs')

module.exports = {
  trailingSlash: false,
  optimizeFonts: true,
  reactStrictMode: true,
  swcMinify: true,
  cleanDistDir: false,

  webpack(config, { isServer }) {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }

    config.plugins.push(
      new (class {
        apply(compiler) {
          compiler.hooks.afterEmit.tapPromise(
            'SymlinkWebpackPlugin',
            async (compiler) => {
              if (isServer) {
                const from = path.join(
                  compiler.options.output.path,
                  '../static',
                )
                const to = path.join(compiler.options.output.path, 'static')

                try {
                  await fs.accessSync(from)
                  console.log(`${from} already exists`)
                  return
                } catch (error) {
                  if (error.code === 'ENOENT') {
                    // No link exists
                  } else {
                    throw error
                  }
                }

                await fs.symlinkSync(to, from, 'junction')
                console.log(`created symlink ${from} -> ${to}`)
              }
            },
          )
        }
      })(),
    )

    return config
  },
}
