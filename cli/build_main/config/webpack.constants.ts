import * as path from "path";
import { Options } from "webpack";

export type TEnvironmentType = ("development" | "production");

export const ENVIRONMENT: TEnvironmentType = process.env.NODE_ENV as TEnvironmentType;
export const IS_PRODUCTION: boolean = (ENVIRONMENT === "production");

export const TARGET: "electron-main" = "electron-main";
export const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../../../");
export const ENTRY_FILE_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/main/application/Application.ts");
export const PROJECT_OUTPUT_FILE_PATH: string = path.resolve(PROJECT_ROOT_PATH, "target/dist");
export const BUILD_CONFIG_DIR_PATH: string = __dirname;
export const TS_CONFIG_PATH: string = path.resolve(PROJECT_ROOT_PATH, "src/main/tsconfig.json");

export const STATS: Options.Stats = {
  assets: true,
  children: true,
  chunkModules: true,
  chunks: true,
  colors: false,
  modules: true,
  timings: true
};

export const DEVELOPMENT_TOOL: Options.Devtool = false;
