import { Configuration } from "webpack";

export const DEV_CONFIG: {
  STATS: Configuration["stats"];
  DEV_TOOL: Configuration["devtool"];
} = {
  DEV_TOOL: false,
  STATS: {
    assets: true,
    children: false,
    chunkModules: false,
    chunks: false,
    colors: true,
    modules: false,
    timings: true
  }
};
