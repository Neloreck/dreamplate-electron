import * as path from "path";

import { DefinePlugin, Configuration, SourceMapDevToolPlugin } from "webpack";

import {
  DOTENV_CONFIG_PATH,
  IS_PRODUCTION,
  PROJECT_ROOT_PATH,
  RUNTIME_CONSTANTS,
  TS_CONFIG_PATH,
  BACKEND_PUBLIC_PATH,
  ESLINT_CONFIG_PATH,
  ESLINT_IGNORE_PATH
} from "../webpack.constants";

// CJS way to import most plugins.
const DotEnv = require("dotenv-webpack");
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * Webpack plugins configuration.
 */
export const PLUGIN_CONFIG: {
  PLUGINS: Configuration["plugins"];
  OPTIMIZATION: Configuration["optimization"];
} = {
  OPTIMIZATION: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            "drop_console": IS_PRODUCTION,
            ecma: 5,
            passes: IS_PRODUCTION ? 5 : 1
          },
          output: {
            beautify: !IS_PRODUCTION,
            ecma: 5
          }
        }
      })
    ],
    emitOnErrors: !IS_PRODUCTION
  },
  PLUGINS: [
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new DotEnv({ path: DOTENV_CONFIG_PATH }),
    new DefinePlugin(RUNTIME_CONSTANTS),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        enabled: true,
        files: path.resolve(PROJECT_ROOT_PATH, "./src/**/*.{ts,tsx,js,jsx}"),
        options: {
          configFile: ESLINT_CONFIG_PATH,
          ignorePath: ESLINT_IGNORE_PATH
        }
      },
      typescript: {
        enabled: true,
        configFile: TS_CONFIG_PATH
      }
    })
  ]
    .concat(IS_PRODUCTION ? [] : [
      new SourceMapDevToolPlugin({
        filename: "source_maps/[base].map[query]",
        publicPath: BACKEND_PUBLIC_PATH,
        fileContext: "public"
      })
    ])
};
