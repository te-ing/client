const widthBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const webpack = require('webpack');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = {
  images: {
    domains: ['boraimageserver.s3.ap-northeast-2.amazonaws.com', 'dreamin-image.s3.ap-northeast-2.amazonaws.com'],
  },
  future: {
    webpack5: true,
  },
  webpack: function (config, { isServer, buildId }) {
    config.resolve.modules.push(__dirname);
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
