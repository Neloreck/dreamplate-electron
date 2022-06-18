import { green, red } from "colors";
import { default as Webpack, MultiCompiler, Configuration, Compiler, MultiStats } from "webpack";
import { default as DevServer } from "webpack-dev-server";

import { WEBPACK_PROCESS_CONFIG, WEBPACK_BRIDGE_CONFIG } from "#/config/process";
import { WEBPACK_RENDERER_CONFIG } from "#/config/renderer";

import { Run } from "../utils";

import { EWebpackFlag } from "./config/webpack.flags";
import { setupEnvironmentFlags } from "./globals/setup_environment";

@Run()
export class BuildAssetsRunner {

  /**
   * Possible args:
   *   - Arguments like '--profile', '--watch', '--server' and '--analyze'
   */
  public static main(args: Array<string>): void {
    const { entries, flags } = setupEnvironmentFlags(args);

    const { WEBPACK_RENDERER_CONFIG } = require("./config/renderer");
    const {
      PROJECT_DIST_PATH,
      PROJECT_ROOT_PATH,
      WEBPACK_PROCESS_CONFIG,
      WEBPACK_BRIDGE_CONFIG
    } = require("./config/process");

    process.stdout.write(
      `Start build asset bundle in ${green(process.env.NODE_ENV || "unselected")} mode.\n\n` +
        `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
        `Project output: '${green(PROJECT_DIST_PATH)}'.\n` +
        (entries ? `Modules for serving: ${green(JSON.stringify(entries))}.\n` : "\n") +
        (flags ? `Flags for serving: ${green(JSON.stringify(flags))}.\n` : "\n")
    );

    if (flags.includes(EWebpackFlag.SERVER)) {
      BuildAssetsRunner.setupDevServer(WEBPACK_RENDERER_CONFIG);
      BuildAssetsRunner.setupBuilder([ WEBPACK_PROCESS_CONFIG, WEBPACK_BRIDGE_CONFIG ], flags);
    } else {
      BuildAssetsRunner.setupBuilder(
        [ WEBPACK_PROCESS_CONFIG, WEBPACK_BRIDGE_CONFIG, WEBPACK_RENDERER_CONFIG ],
        flags
      );
    }
  }

  /**
   * Setup assets builder in watch mode or as single time runner.
   */
  public static setupBuilder(configs: Array<Configuration>, flags: Array<string>): void {
    const compiler: MultiCompiler = Webpack(configs);

    flags.includes(EWebpackFlag.WATCH)
      ? compiler.watch({}, BuildAssetsRunner.onCompileError)
      : compiler.run(BuildAssetsRunner.onCompileError);
  }

  /**
   * Setup dev server to handle HMR for local dev environment.
   */
  public static setupDevServer(config: Configuration): void {
    const compiler: Compiler = Webpack(config);
    const server = new DevServer(config.devServer, compiler);

    server.start();
  }

  /**
   * Handle compilation errors and print info in stdout.
   */
  public static onCompileError(error?: Error | null, stats?: MultiStats): void {
    const printConfig: Record<string, boolean> = {
      colors: true
    };

    if (error) {
      process.stdout.write(
        red("\nFailed to build asset bundle: " + "\n" + (error as any).toString(printConfig) + "\n")
      );
    } else if (stats) {
      process.stdout.write(
        green("\nSuccessfully built asset bundle: " + "\n" + stats.toString(printConfig) + "\n")
      );
    }
  }

}
