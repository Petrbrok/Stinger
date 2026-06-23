import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === "1" ? "/Stinger" : "",
  images: {
    unoptimized: true,
    remotePatterns: []
  }
};

export default nextConfig;
