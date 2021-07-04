import { green } from "colors";
import { default as Webpack, Compiler } from "webpack";
import { default as DevServer } from "webpack-dev-server";

import { Run } from "../utils";

@Run()
export class DevServerRenderRunner {

  public static main(args: Array<string>): void {
    /**
     * Handle entries selection for optional serving.
     */
    if (args.length > 2) {
      process.env.ENTRIES = JSON.stringify(args.slice(2));
    }

    const {
      WEBPACK_RENDERER_CONFIG, DEV_SERVER_PORT, DEV_SERVER_HOST, PROJECT_ROOT_PATH, PROJECT_OUTPUT_PATH
    } = require("./config/renderer");
    const compiler: Compiler = Webpack(WEBPACK_RENDERER_CONFIG);
    const server = new DevServer(compiler as any, WEBPACK_RENDERER_CONFIG.devServer);

    server.listen(DEV_SERVER_PORT, DEV_SERVER_HOST);

    process.stdout.write(
      `\nStarted dev server for renderer bundle in ${green(process.env.NODE_ENV || "unselected")} mode. \n` +
      `Project root: '${green(PROJECT_ROOT_PATH)}'.\n` +
      `Project output: '${green(PROJECT_OUTPUT_PATH)}'.\n` +
      (args.length > 2 ? `Modules for serving: ${green(JSON.stringify(args.slice(2)))}.\n\n` : "\n")
    );
  }

}
