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
        test: /\.(ts|tsx)$/
      },
      // SCSS/CSS.
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      // FONTS.
      {
        loader: "url-loader",
        query: {
          limit: 512,
          name: "fonts/[name].[ext]"
        },
        test: /\.(woff|woff2|eot|ttf)$/
      },
      // HBS.
      {
        loader: "handlebars-loader",
        options: {
          helperDirs: path.resolve(PROJECT_ROOT_PATH, "./cli/build_renderer/template/helpers"),
          partialDirs: path.resolve(PROJECT_ROOT_PATH, "./cli/build_renderer/template/partials")
        },
        test: /\.hbs$/
      },
      // IMAGES.
      {
        test: /\.(gif|png|jpe|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // include <5KB files in bundle file
              limit: 5000,
              name: "images/[name].[ext]"
            }
          }
        ]
      }
    ]
  },
  RESOLVE: {
    alias: {
      "@Api": path.resolve(PROJECT_ROOT_PATH, "./src/renderer/api/"),
      "@Application": path.resolve(PROJECT_ROOT_PATH, "./src/renderer/application/"),
      "@Lib": path.resolve(PROJECT_ROOT_PATH, "./src/lib/"),
      "@Main": path.resolve(PROJECT_ROOT_PATH, "./src/renderer/application/main"),
      "@Module": path.resolve(PROJECT_ROOT_PATH, "./src/renderer/application/modules/")
    },
    extensions: [
      ".ts",
      ".tsx",
      ".js",
      "jsx"
    ],
    modules: [
      path.resolve(PROJECT_ROOT_PATH, "src/renderer/application"),
      path.resolve(PROJECT_ROOT_PATH, "node_modules")
    ]
  }
};
