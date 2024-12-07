import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, 
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gamePalavraDoDia' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/gamePalavraDoDia' : '',
};

module.exports = nextConfig;
