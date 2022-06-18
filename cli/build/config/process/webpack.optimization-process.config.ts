import { Configuration } from "webpack";

import { IS_PRODUCTION } from "../webpack.constants";

// CJS way to import most plugins.
const TerserPlugin = require("terser-webpack-plugin");

/**
 * Webpack plugins configuration.
 */
export const OPTIMIZATION_CONFIG: Configuration["optimization"] = {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        ecma: 2020,
        compress: {
          ["drop_console"]: IS_PRODUCTION,
          passes: IS_PRODUCTION ? 5 : 1
        },
        output: {
          comments: IS_PRODUCTION ? false : "some"
        }
      }
    })
  ],
  emitOnErrors: !IS_PRODUCTION
};
