const widthBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
const webpack = require('webpack');

dotenvLoad();

const withNextEnv = nextEnv();

module.exports = {
  env: {
    NEXT_PUBLIC_REST_API_KEY: process.env.NEXT_PUBLIC_REST_API_KEY,
    NEXT_PUBLIC_JAVASCRIPT_KEY: process.env.NEXT_PUBLIC_JAVASCRIPT_KEY,
    NEXT_PUBLIC_SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    NEXT_PUBLIC_GOOGLE_REDIRECT_URI: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_AWS_STORAGE_BUCKET_NAME: process.env.NEXT_PUBLIC_AWS_STORAGE_BUCKET_NAME,
    NEXT_PUBLIC_TEST_COGNITO: process.env.NEXT_PUBLIC_TEST_COGNITO,
    NEXT_PUBLIC_BUCKET_NAME: process.env.NEXT_PUBLIC_BUCKET_NAME,
  },
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
