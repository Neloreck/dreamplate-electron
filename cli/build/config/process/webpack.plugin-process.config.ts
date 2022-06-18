import { DefinePlugin, Configuration, SourceMapDevToolPlugin } from "webpack";

import {
  DOTENV_CONFIG_PATH,
  IS_PRODUCTION,
  RUNTIME_CONSTANTS,
  TS_CONFIG_PATH,
  BACKEND_PUBLIC_PATH,
  IS_ANALYZE_ENABLED,
  REPORT_PROCESS_ANALYZER_PATH,
  BASE_PROJECT_PACKAGE_PATH,
  BASE_PROJECT_ASSETS_PATH,
  PROJECT_BUILD_ASSETS_PATH
} from "../webpack.constants";

// CJS way to import most plugins.
const CopyWebpackPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/**
 * Webpack plugins configuration.
 */
export const PLUGIN_CONFIG: Configuration["plugins"] = [
  new DuplicatePackageCheckerPlugin({ verbose: true }),
  new DotEnv({ path: DOTENV_CONFIG_PATH }),
  new DefinePlugin(RUNTIME_CONSTANTS),
  new ForkTsCheckerWebpackPlugin({
    devServer: false,
    typescript: {
      enabled: true,
      configFile: TS_CONFIG_PATH
    }
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: BASE_PROJECT_PACKAGE_PATH },
      { from: BASE_PROJECT_ASSETS_PATH, to: PROJECT_BUILD_ASSETS_PATH }
    ]
  })
]
  .concat(
    IS_PRODUCTION
      ? []
      : [
        new SourceMapDevToolPlugin({
          filename: "[base].map[query]",
          publicPath: BACKEND_PUBLIC_PATH,
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
          reportFilename: REPORT_PROCESS_ANALYZER_PATH
        })
      ]
      : []
  );
