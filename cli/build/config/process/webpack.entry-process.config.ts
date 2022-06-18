import { Configuration } from "webpack";

import { PROCESS_ENTRY_PATH } from "../webpack.constants";

export const ENTRY_CONFIG: Configuration["entry"] = [ PROCESS_ENTRY_PATH ];
