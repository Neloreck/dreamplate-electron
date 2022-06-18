import { Configuration } from "webpack";

import { ENVIRONMENT, IS_PRODUCTION } from "../webpack.constants";
import { MODULE_CONFIG } from "../webpack.module.config";
import { PERFORMANCE_CONFIG } from "../webpack.performance.config";
import { RESOLVE_CONFIG, RESOLVE_LOADER_CONFIG } from "../webpack.resolve.config";
import { STATS_CONFIG } from "../webpack.stats.config";

import { ENTRY_CONFIG } from "./webpack.entry-process.config";
import { WEBPACK_EXTERNALS_CONFIG } from "./webpack.external.config";
import { OPTIMIZATION_CONFIG } from "./webpack.optimization-process.config";
import { OUTPUT_CONFIG } from "./webpack.output-process.config";
import { PLUGIN_CONFIG } from "./webpack.plugin-process.config";

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
export const WEBPACK_PROCESS_CONFIG: Configuration = {
  devtool: false,
  entry: ENTRY_CONFIG,
  mode: IS_PRODUCTION ? "production" : "development",
  externals: WEBPACK_EXTERNALS_CONFIG,
  module: MODULE_CONFIG,
  optimization: OPTIMIZATION_CONFIG,
  output: OUTPUT_CONFIG,
  plugins: PLUGIN_CONFIG,
  resolve: RESOLVE_CONFIG,
  resolveLoader: RESOLVE_LOADER_CONFIG,
  stats: STATS_CONFIG,
  performance: PERFORMANCE_CONFIG,
  target: "electron-main"
} as Configuration;
