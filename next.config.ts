import type { NextConfig } from "next";
import path from "node:path";

const stylesDir = path.join(process.cwd(), "src/shared/styles");

const nextConfig: NextConfig = {
  sassOptions: {
    // `loadPaths` for the modern Dart Sass API, `includePaths` for legacy —
    // set both so `@use "mixins"` / `@use "variables"` resolve either way.
    loadPaths: [stylesDir],
    includePaths: [stylesDir],
  },
};

export default nextConfig;
