import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "export", // Important for Capacitor
  trailingSlash: false,
  images: {
    unoptimized: true, // Required for static export
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '',
  
};

export default nextConfig;
