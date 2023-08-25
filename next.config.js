/** @type {import('next').NextConfig} */

const nextConfig = {
    basePath: '/aap/regelverk',
    trailingSlash: true,
    reactStrictMode: true,
    output: 'standalone',
    assetPrefix: process.env.ASSET_PREFIX ?? undefined,
  
    experimental: {
      instrumentationHook: true,
    },
  };
  
  module.exports = nextConfig;