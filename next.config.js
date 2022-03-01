const widthBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const webpack = require('webpack');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = {
  webpack(config, { isServer, buildId }) {
    config.resolve.modules.push(__dirname);
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
