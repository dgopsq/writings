/** @type {import('next').NextConfig} */
export default {
  trailingSlash: false,
  reactStrictMode: true,
  output: 'export',
  typedRoutes: true,

  experimental: {
    // TypeScript 7 is the Go-native compiler and does not expose the JS
    // compiler API Next uses for its build-time type check. This makes Next
    // shell out to the tsc CLI instead.
    useTypeScriptCli: true,
  },
}
