import { Entry, Output } from "webpack";

import {ENTRY_FILE_PATH, PROJECT_OUTPUT_FILE_PATH} from "./webpack.constants";

export const IO_CONFIG: {
  ENTRY: Entry | Array<string>,
  OUTPUT: Output
} = {
  ENTRY: [ ENTRY_FILE_PATH ],
  OUTPUT: {
    filename: "main.js",
    path: PROJECT_OUTPUT_FILE_PATH
  }
};
