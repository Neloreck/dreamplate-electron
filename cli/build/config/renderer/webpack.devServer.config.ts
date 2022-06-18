import {
  BACKEND_PUBLIC_PATH,
  DEV_SERVER_CONTENT_BASE,
  DEV_SERVER_HOST,
  DEV_SERVER_PORT,
  IS_PRODUCTION,
  MODULES_CONFIG
} from "../webpack.constants";
import { IModulesDefinition } from "../webpack.types";

/**
 * Generate fallback redirects/urls for dev server history usage.
 */
const createFallbackRewrites = (definition: IModulesDefinition) => {
  const rewrites: Array<{ from: RegExp; to: string }> = [];

  for (const module of definition.modules) {
    rewrites.push({
      from: new RegExp(`/${module.name}`),
      to: `/html/${module.name}.html`
    });
  }

  return rewrites;
};

export const DEV_SERVER_CONFIG: Record<string, any> = {
  devMiddleware: {
    publicPath: BACKEND_PUBLIC_PATH,
    writeToDisk: true
  },
  historyApiFallback: {
    rewrites: createFallbackRewrites(MODULES_CONFIG)
  },
  client: {
    logging: "error",
    overlay: false,
    progress: !IS_PRODUCTION
  },
  server: "https",
  static: DEV_SERVER_CONTENT_BASE,
  host: DEV_SERVER_HOST,
  port: DEV_SERVER_PORT,
  hot: true
};
