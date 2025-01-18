/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enable experimental features for Turbopack
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'), // Map '@' to the 'app' directory
    };
    return config;
  },
};

module.exports = nextConfig;
