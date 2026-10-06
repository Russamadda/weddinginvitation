import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  outputFileTracingExcludes: { "/*": ["./.local-data/**/*", "./Reference/**/*", "./.env.local", "./.env.*.local"] },
};
export default nextConfig;
