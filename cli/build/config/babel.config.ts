import * as path from "path";

import { IS_PRODUCTION, IS_TEST, DEV_SERVER_REFRESH } from "./webpack.constants";

/**
 * Babel configuration for project codebase.
 */
export const BABEL_CONFIG = {
  babelrc: false,
  minified: IS_PRODUCTION && !IS_TEST,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: 96
        }
      }
    ],
    "@babel/preset-typescript",
    [ "@babel/preset-react", { runtime: "automatic" } ]
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "module-resolver",
      {
        alias: {
          "#": path.resolve(__dirname, "../")
        }
      }
    ],
    "macros",
    "@babel/plugin-transform-react-constant-elements",
    "@babel/plugin-proposal-class-properties",
    [ "@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true } ]
  ].concat(DEV_SERVER_REFRESH ? [ "react-refresh/babel" ] : [])
};
