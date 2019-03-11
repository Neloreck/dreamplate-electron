import * as path from "path";
import { Module, Resolve } from "webpack";

import { PROJECT_ROOT_PATH, TS_CONFIG_PATH } from "./webpack.constants";

export const MODULE_CONFIG: {
  RESOLVE: Resolve,
  MODULE: Module
} = {
  MODULE: {
    rules: [
      // TS/TSX.
      {
        exclude: /(node_modules)/,
        loader: "awesome-typescript-loader",
        query: {
          configFileName: TS_CONFIG_PATH
        },
        test: /\.(ts)$/
      },
    ]
  },
  RESOLVE: {
    alias: {
      "@Application": path.resolve(PROJECT_ROOT_PATH, "./src/main/application/"),
      "@Lib": path.resolve(PROJECT_ROOT_PATH, "./src/lib/")
    },
    extensions: [
      ".ts",
      ".js"
    ],
    modules: [
      path.resolve(PROJECT_ROOT_PATH, "src/main"),
      path.resolve(PROJECT_ROOT_PATH, "node_modules")
    ]
  }
};
