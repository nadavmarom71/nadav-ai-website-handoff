import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The dev badge sits over the mobile CTA area and lands in review screenshots.
  devIndicators: false,
};

export default nextConfig;
