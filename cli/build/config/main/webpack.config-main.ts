import { Configuration } from "webpack";

import { ENVIRONMENT, IS_PRODUCTION } from "../webpack.constants";
import { MODULE_CONFIG } from "../webpack.module.config";
import { PERFORMANCE_CONFIG } from "../webpack.performance.config";
import { RESOLVE_CONFIG } from "../webpack.resolve.config";
import { STATS_CONFIG } from "../webpack.stats.config";

import { WEBPACK_EXTERNALS_CONFIG } from "./webpack.external.config";
import { IO_CONFIG } from "./webpack.io-main.config";
import { PLUGIN_CONFIG } from "./webpack.plugin-main.config";

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
export const WEBPACK_MAIN_CONFIG: Configuration = {
  devtool: false,
  entry: IO_CONFIG.ENTRY,
  mode: IS_PRODUCTION ? "production" : "development",
  externals: WEBPACK_EXTERNALS_CONFIG,
  module: MODULE_CONFIG,
  optimization: PLUGIN_CONFIG.OPTIMIZATION,
  output: IO_CONFIG.OUTPUT,
  plugins: PLUGIN_CONFIG.PLUGINS,
  resolve: RESOLVE_CONFIG,
  stats: STATS_CONFIG,
  performance: PERFORMANCE_CONFIG,
  target: "electron-main"
} as Configuration;

export default WEBPACK_MAIN_CONFIG;
