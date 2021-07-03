import * as path from "path";

import { Configuration } from "webpack";

import * as packageConfig from "../../../package.json";

import {
  BUILD_CONFIGURATION_PATH,
  PROJECT_ROOT_NODE_MODULES_PATH,
  PROJECT_ROOT_PATH
} from "./webpack.constants";
function generateGlobalDependenciesAlias(): Record<string, string> {
  return Object
    .keys(packageConfig.dependencies)
    .reduce((acc: Record<string, string>, pkg: string) =>
      (acc[pkg] = path.resolve(PROJECT_ROOT_NODE_MODULES_PATH, pkg), acc), {});
}

export const RESOLVE_CONFIG: Configuration["resolve"] = {
  alias: {
    "#": path.resolve(BUILD_CONFIGURATION_PATH, "./"),
    "@": path.resolve(PROJECT_ROOT_PATH, "src/renderer/"),
    "~": path.resolve(PROJECT_ROOT_PATH, "src/main/"),
    ...generateGlobalDependenciesAlias()
  },
  extensions: [
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json"
  ],
  modules: [
    "node_modules"
  ]
};
