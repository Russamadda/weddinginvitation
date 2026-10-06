import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["127.0.0.1"],
  outputFileTracingExcludes: { "/*": ["./.local-data/**/*", "./Reference/**/*", "./.env.local", "./.env.*.local"] },
};
export default nextConfig;
