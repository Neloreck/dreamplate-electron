import { Configuration } from "webpack";

import { MAIN_ENTRY_PATH, PROJECT_MAIN_DIST_PATH } from "../webpack.constants";

export const IO_CONFIG: {
  ENTRY: Configuration["entry"];
  OUTPUT: Configuration["output"];
} = {
  ENTRY: [ MAIN_ENTRY_PATH ],
  OUTPUT: {
    filename: "index.js",
    path: PROJECT_MAIN_DIST_PATH
  }
};
