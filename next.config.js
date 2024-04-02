// next.config.js dosyası

const withPWA = require('next-pwa');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/.well-known/assetlinks.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
  ...withPWA({
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true
    },
  }),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
