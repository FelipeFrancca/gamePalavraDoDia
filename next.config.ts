import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gamePalavraDoDia' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/gamePalavraDoDia' : '',
};

export default nextConfig;
