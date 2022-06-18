import * as path from "path";

import * as colors from "../globals/colors";
import * as theme from "../globals/theme";
import { asConstantsObject } from "../globals/utils";

import { EWebpackFlag } from "./webpack.flags";
import { IModulesDefinition, TEnvironmentType } from "./webpack.types";

/**
 * Environment configuration.
 */

export const ENVIRONMENT: TEnvironmentType = process.env.NODE_ENV as TEnvironmentType;
export const IS_TEST: boolean = ENVIRONMENT === "test";
export const IS_PRODUCTION: boolean = ENVIRONMENT === "production" || IS_TEST;

/**
 * ENV flags.
 */
export const IS_ANALYZE_ENABLED: boolean = process.env[EWebpackFlag.ANALYZE] === "true";
export const IS_COVERAGE_ENABLED: boolean = process.env[EWebpackFlag.COVERAGE] === "true";
export const IS_DEV_SERVER_ENABLED: boolean = process.env[EWebpackFlag.SERVER] === "true";
export const IS_PROFILING_ENABLED: boolean = process.env[EWebpackFlag.PROFILE] === "true";
export const IS_PACKAGED: boolean = process.env[EWebpackFlag.PACKAGED] === "true";

/**
 * Project paths configuration.
 */

export const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../../../");
export const CLI_PATH: string = path.resolve(PROJECT_ROOT_PATH, "cli");
export const SRC_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src");

export const BUILD_CONFIGURATION_PATH: string = path.resolve(PROJECT_ROOT_PATH, "cli/build");

export const RENDERER_MODULES_ROOT_PATH: string = path.resolve(
  PROJECT_ROOT_PATH,
  "src/renderer/modules"
);
export const RENDERER_INITIALIZATION_ROOT_PATH: string = path.resolve(
  PROJECT_ROOT_PATH,
  "src/renderer/initialization"
);
export const RENDERER_BRIDGE_ROOT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/bridge");

export const PROJECT_OUTPUT_PATH: string = path.resolve(PROJECT_ROOT_PATH, "target/");
export const PROJECT_DIST_PATH: string = path.resolve(PROJECT_OUTPUT_PATH, "dist/");
export const PROJECT_PROCESS_DIST_PATH: string = path.resolve(PROJECT_DIST_PATH, ".");
export const PROJECT_RENDERER_DIST_PATH: string = path.resolve(PROJECT_DIST_PATH, "assets/");
export const PROJECT_BUILD_ASSETS_PATH: string = path.resolve(
  PROJECT_DIST_PATH,
  "build_resources/"
);

export const DOTENV_CONFIG_PATH: string = path.resolve(
  BUILD_CONFIGURATION_PATH,
  `env/.${ENVIRONMENT}.env`
);
export const TS_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/tsconfig.json");
export const BASE_PROJECT_TEMPLATE_PATH: string = path.resolve(
  BUILD_CONFIGURATION_PATH,
  "template/base.hbs"
);
export const BASE_PROJECT_FAVICON_PATH: string = path.resolve(
  BUILD_CONFIGURATION_PATH,
  "template/favicon.ico"
);

export const BASE_PROJECT_STATIC_PATH: string = path.resolve(SRC_PATH, "public");
export const BASE_PROJECT_PACKAGE_PATH: string = path.resolve(
  BUILD_CONFIGURATION_PATH,
  "./release/application"
);
export const BASE_PROJECT_ASSETS_PATH: string = path.resolve(
  BUILD_CONFIGURATION_PATH,
  "./release/assets"
);

/**
 * Assets paths configuration.
 */
export const BACKEND_STATIC_PUBLIC_PATH: string = `file://${PROJECT_RENDERER_DIST_PATH}/`;
export const BACKEND_PUBLIC_PATH: string = IS_DEV_SERVER_ENABLED ? "/" : "auto";

/**
 * Report configuration.
 */
export const REPORT_RENDERER_STATS_PATH: string = "../../info/renderer-report.json";

export const REPORT_RENDERER_ANALYZER_PATH: string = path.resolve(
  PROJECT_OUTPUT_PATH,
  "info/renderer-report.html"
);
export const REPORT_PROCESS_ANALYZER_PATH: string = path.resolve(
  PROJECT_OUTPUT_PATH,
  "info/process-report.html"
);
export const REPORT_BRIDGE_ANALYZER_PATH: string = path.resolve(
  PROJECT_OUTPUT_PATH,
  "info/bridge-report.html"
);

/**
 * Dev server configuration.
 */

export const DEV_SERVER_HOST: string = "0.0.0.0";
export const DEV_SERVER_PORT: number = 3000;
export const DEV_SERVER_CONTENT_BASE: string = PROJECT_DIST_PATH;
export const DEV_SERVER_REFRESH: boolean = process.env.REFRESH === "true";

export const PROJECT_CORE_DEPENDENCIES: Array<string> = [
  "react",
  "react-dom",
  "loose-envify",
  "object-assign",
  "scheduler"
];

export const PROJECT_INLINE_MODULES: Array<string | RegExp> = [
  /.*\/initialization.*/, // Critical renderer code for inlining.
  /.*\/runtime.*$/ // Webpack runtime support.
];

export const MAX_CORE_CHUNK_SIZE: number = IS_PRODUCTION ? 500 * 1000 : 3000 * 1000;

/**
 * Globals configuration.
 */

export const RUNTIME_CONSTANTS = {
  IS_DEV: !IS_PRODUCTION,
  IS_TEST,
  IS_SERVED: IS_DEV_SERVER_ENABLED,
  IS_PACKAGED: IS_PACKAGED,
  // Build time constants for inlining.
  GColor: asConstantsObject(colors),
  GTheme: asConstantsObject(theme)
};

/**
 * Project process modules config.
 */

export const PROCESS_ENTRY_PATH: string = path.resolve(
  PROJECT_ROOT_PATH,
  "src/process/Application.ts"
);

/**
 * Project rendering modules config.
 */

// Entries that will always be built.
export const REQUIRED_ENTRIES: Array<string> = [ "error" ];

export const SELECTED_ENTRIES: Array<string> | null = process.env[EWebpackFlag.ENTRIES]
  ? JSON.parse(process.env[EWebpackFlag.ENTRIES] as string)
  : null;

export const MODULES_CONFIG: IModulesDefinition = (() => {
  const config = require(path.resolve(RENDERER_MODULES_ROOT_PATH, "modules.json"));

  if (SELECTED_ENTRIES) {
    // Check if requested modules exist.
    SELECTED_ENTRIES.forEach((it: string) => {
      if (config.modules.some((module: { name: string }) => module.name === it)) {
        return;
      } else {
        throw new Error("Requested module was not declared in modules.json file: " + it);
      }
    });

    // Select only requested modules.
    config.modules = config.modules.filter((it: { name: string }) =>
      SELECTED_ENTRIES.concat(REQUIRED_ENTRIES).includes(it.name));
  }

  return config;
})();
