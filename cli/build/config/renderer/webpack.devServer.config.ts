import {
  BACKEND_PUBLIC_PATH,
  DEV_SERVER_CONTENT_BASE,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  IS_PRODUCTION,
  MODULES_CONFIG,
  DEV_SERVER_PROTOCOL
} from "../webpack.constants";
import { IModulesDefinition } from "../webpack.types";

/**
 * Generate fallback redirects/urls for dev server history usage.
 */
const createFallbackRewrites = (definition: IModulesDefinition) => {
  const rewrites: Array<{ from: RegExp; to: string }> = [];

  for (const module of definition.modules) {
    rewrites.push({ from: new RegExp(`/${module.name}`), to: `/${module.name}.html` });
  }

  return rewrites;
};

export const DEV_SERVER_CONFIG: Record<string, any> = {
  clientLogLevel: "error",
  compress: IS_PRODUCTION,
  contentBase: DEV_SERVER_CONTENT_BASE,
  headers: {
    // "Cache-Control": "max-age=60"
  },
  historyApiFallback: {
    rewrites: createFallbackRewrites(MODULES_CONFIG)
  },
  host: DEV_SERVER_HOST,
  hot: true,
  // http2: true, // Unsupported for node 10+.
  https: DEV_SERVER_PROTOCOL === "https",
  inline: !IS_PRODUCTION,
  port: DEV_SERVER_PORT,
  publicPath: BACKEND_PUBLIC_PATH
};
