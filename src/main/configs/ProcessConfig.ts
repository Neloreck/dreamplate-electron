import * as path from "path";

export const processConfig = {
  ENVIRONMENT: process.env.NODE_ENV || "development",
  IS_DEVELOPMENT: process.env.NODE_ENV !== "production",
  RESOURCES: {
    RENDERER: path.resolve(__dirname, "../../../target/dist/renderer")
  }
};
