import { Configuration } from "webpack";

import { ENVIRONMENT, IS_PRODUCTION } from "../webpack.constants";
import { DEV_CONFIG } from "../webpack.dev.config";
import { MODULE_CONFIG } from "../webpack.module.config";
import { PERFORMANCE_CONFIG } from "../webpack.performance.config";
import { RESOLVE_CONFIG } from "../webpack.resolve.config";

import { IO_CONFIG } from "./webpack.io-renderer.config";
import { PLUGIN_CONFIG } from "./webpack.plugin-renderer.config";

/**
 * Restrict build with environment declaration to prevent unexpected issues.
 */
if (!ENVIRONMENT) {
  throw new Error("Environment must be set for webpack build.");
}

/**
 * Project-level webpack configuration.
 * Bundled from multiple computed scripts.
 */
export const WEBPACK_RENDERER_CONFIG: Configuration = {
  devtool: DEV_CONFIG.DEV_TOOL,
  entry: IO_CONFIG.ENTRY,
  mode: IS_PRODUCTION ? "production" : "development",
  module: MODULE_CONFIG,
  optimization: PLUGIN_CONFIG.OPTIMIZATION,
  output: IO_CONFIG.OUTPUT,
  plugins: PLUGIN_CONFIG.PLUGINS,
  resolve: RESOLVE_CONFIG,
  stats: DEV_CONFIG.STATS,
  performance: PERFORMANCE_CONFIG,
  target: "electron-renderer"
} as Configuration;

export default WEBPACK_RENDERER_CONFIG;