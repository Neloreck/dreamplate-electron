import { Configuration } from "webpack";

import { PROJECT_PROCESS_DIST_PATH } from "../webpack.constants";

export const OUTPUT_CONFIG: Configuration["output"] = {
  filename: "main.js",
  path: PROJECT_PROCESS_DIST_PATH
};
