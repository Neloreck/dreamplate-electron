import * as path from "path";

import { resolveAssetEntry } from "@/process/utils/electron";

const PROJECT_ROOT_PATH: string = path.resolve(__dirname, "../..");
const ENVIRONMENT: string = process.env.NODE_ENV || "development";
const IS_DEVELOPMENT: boolean = process.env.NODE_ENV !== "production";

export const processConfig = {
  ENVIRONMENT,
  IS_DEVELOPMENT,
  IS_DEBUG: process.env.DEBUG === "true",
  IS_PACKAGED: IS_PACKAGED,
  DEVELOPMENT: {
    IS_SERVED: IS_SERVED,
    SERVER: {
      PORT: 3000,
      PROTOCOL: "https",
      HMR_PROTOCOL: "wss",
      HOST: "localhost",
      get URL(): string {
        return (
          `${processConfig.DEVELOPMENT.SERVER.PROTOCOL}://` +
          `${processConfig.DEVELOPMENT.SERVER.HOST}:${processConfig.DEVELOPMENT.SERVER.PORT}`
        );
      },
      get HMR_URL(): string {
        return (
          `${processConfig.DEVELOPMENT.SERVER.HMR_PROTOCOL}://` +
          `${processConfig.DEVELOPMENT.SERVER.HOST}:${processConfig.DEVELOPMENT.SERVER.PORT}`
        );
      }
    },
    WEB_EXTENSIONS: {
      ENABLED: IS_DEVELOPMENT,
      UPGRADE: false,
      LIST: [ "REACT_DEVELOPER_TOOLS" ]
    }
  },
  RESOURCES: {
    RENDERER: {
      STATICS_PATH: IS_PACKAGED
        ? path.resolve(process.resourcesPath, "./app/assets")
        : path.resolve(PROJECT_ROOT_PATH, "./target/dist/assets")
    },
    PRELOAD: {
      get MAIN_BRIDGE_PATH(): string {
        return resolveAssetEntry("js/bridge.js", { isLocalForced: true });
      }
    }
  }
};
