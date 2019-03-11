import { CheckerPlugin, TsConfigPathsPlugin } from "awesome-typescript-loader";
import * as path from "path";
import { Options, Plugin } from "webpack";

// tslint:disable: no-var-requires typedef
const DotEnv = require("dotenv-webpack");
const TerserPlugin = require("terser-webpack-plugin");

import { ENVIRONMENT, IS_PRODUCTION, BUILD_CONFIG_DIR_PATH } from "./webpack.constants";

export const PLUGIN_CONFIG: {
  PLUGINS: Array<Plugin>,
  OPTIMIZATION: Options.Optimization
} = {
  OPTIMIZATION: {
    minimizer: [
      new TerserPlugin({
        sourceMap: !IS_PRODUCTION,
        terserOptions: {
          compress: {},
          ecma: 6,
          ie8: false,
          keep_classnames: false,
          keep_fnames: true,
          mangle: true,
          module: true,
          nameCache: null,
          output: {
            beautify: false
          },
          parse: {},
          safari10: false,
          toplevel: false,
          unused: false,
          warnings: false
        },
      })
    ],
    runtimeChunk: false,
    splitChunks: false
  },
  PLUGINS: [
    new TsConfigPathsPlugin({}),
    new CheckerPlugin(),
    new DotEnv({
      path: path.resolve(BUILD_CONFIG_DIR_PATH, `./.${ENVIRONMENT}.env`)
    })
  ],
};
