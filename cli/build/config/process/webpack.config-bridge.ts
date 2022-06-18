import { Configuration, DefinePlugin, SourceMapDevToolPlugin } from "webpack";

import {
  ENVIRONMENT,
  IS_PRODUCTION,
  RENDERER_BRIDGE_ROOT_PATH,
  DOTENV_CONFIG_PATH,
  RUNTIME_CONSTANTS,
  TS_CONFIG_PATH,
  PROJECT_RENDERER_DIST_PATH,
  IS_ANALYZE_ENABLED,
  REPORT_BRIDGE_ANALYZER_PATH,
  BACKEND_STATIC_PUBLIC_PATH,
  IS_DEV_SERVER_ENABLED
} from "../webpack.constants";
import { MODULE_CONFIG } from "../webpack.module.config";
import { RESOLVE_CONFIG, RESOLVE_LOADER_CONFIG } from "../webpack.resolve.config";

import { OPTIMIZATION_CONFIG } from "./webpack.optimization-process.config";

// CJS way to import most plugins.
const DotEnv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
export const WEBPACK_BRIDGE_CONFIG: Configuration = {
  devtool: false,
  entry: {
    bridge: {
      import: [ RENDERER_BRIDGE_ROOT_PATH ]
    }
  },
  mode: IS_PRODUCTION ? "production" : "development",
  module: MODULE_CONFIG,
  optimization: OPTIMIZATION_CONFIG,
  output: {
    filename: "js/[name].js",
    path: PROJECT_RENDERER_DIST_PATH
  },
  plugins: [
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new DotEnv({ path: DOTENV_CONFIG_PATH }),
    new DefinePlugin(RUNTIME_CONSTANTS),
    new ForkTsCheckerWebpackPlugin({
      devServer: false,
      typescript: {
        enabled: true,
        configFile: TS_CONFIG_PATH
      }
    })
  ]
    .concat(
      IS_PRODUCTION
        ? []
        : [
          new SourceMapDevToolPlugin({
            filename: "js/[base].map[query]",
            publicPath: IS_DEV_SERVER_ENABLED ? BACKEND_STATIC_PUBLIC_PATH : undefined,
            fileContext: "public"
          })
        ]
    )
    .concat(
      IS_ANALYZE_ENABLED
        ? [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            defaultSizes: "gzip",
            openAnalyzer: false,
            reportFilename: REPORT_BRIDGE_ANALYZER_PATH
          })
        ]
        : []
    ),
  resolve: RESOLVE_CONFIG,
  resolveLoader: RESOLVE_LOADER_CONFIG,
  target: "electron-preload"
} as Configuration;
