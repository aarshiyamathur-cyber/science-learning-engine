import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@aarshiya/curriculum-schema",
    "@aarshiya/learning-engine",
    "@aarshiya/ollama-client",
  ],
};

export default nextConfig;
