import { green, red } from "colors";
import { default as Webpack, Compiler } from "webpack";

import { Run } from "../utils";

@Run()
export class WatchMainRunner {

  public static readonly STATS_PRINT_CONFIG: Record<string, any> = { colors: true };

  public static main(args: Array<string>): void {
    /**
     * Handle entries selection for optional serving.
     */
    if (args.length > 2) {
      process.env.ENTRIES = JSON.stringify(args.slice(2));
    }

    const {
      WEBPACK_MAIN_CONFIG, PROJECT_ROOT_PATH, PROJECT_MAIN_DIST_PATH
    } = require("./config/main");
    const compiler: Compiler = Webpack(WEBPACK_MAIN_CONFIG);

    compiler.watch({}, (error: any, stats: any): void => {
      if (error) {
        process.stdout.write(red("\nFailed to build built script: " + "\n" +
          error.toString(WatchMainRunner.STATS_PRINT_CONFIG) + "\n"));
      } else {
        process.stdout.write(green("\nSuccessfully built main script: " + "\n" +
          stats.toString(WatchMainRunner.STATS_PRINT_CONFIG) + "\n"));
      }
    });
    process.stdout.write(
      `\nStarted watch for main script in ${green(process.env.NODE_ENV || "unselected")} mode. \n` +
      `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
      `Project output: '${green(PROJECT_MAIN_DIST_PATH)}'.\n` +
      (args.length > 2 ? `Modules for serving: ${green(JSON.stringify(args.slice(2)))}.\n\n` : "\n")
    );
  }

}
