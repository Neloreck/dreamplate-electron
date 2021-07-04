import * as fs from "fs";
import * as path from "path";
import { format as formatUrl } from "url";

import { BrowserWindow } from "electron";

import { log } from "#/macroses/log.macro";
import { default as modulesConfig } from "@/modules/modules.json";
import { processConfig } from "~/configs/ProcessConfig";
import { IModuleDefinition } from "~/types";

/**
 * Get entry file path for a specified module.
 * Throws exception if file is not found.
 */
export async function loadWindowResourceForModule(window: BrowserWindow, moduleName: string): Promise<void> {
  const moduleConfig: undefined | IModuleDefinition = [ ...modulesConfig.modules ]
    .find((it: IModuleDefinition) => it.name === moduleName);

  if (!moduleConfig) {
    throw new Error(`Cannot find resources for undefined module: '${moduleName}'.`);
  }

  if (processConfig.IS_DEVELOPMENT) {
    const devServerUrl: string = processConfig.RESOURCES.RENDERER.SERVER.PROTOCOL + "://"
      + processConfig.RESOURCES.RENDERER.SERVER.HOST + ":" + processConfig.RESOURCES.RENDERER.SERVER.PORT;
    const windowRemoteUrl: string = `${devServerUrl}/${moduleConfig.name}`;

    log.info("Fetching remote resource for window:", windowRemoteUrl);

    return window.loadURL(windowRemoteUrl);
  } else {
    const possibleSourcePath: string = path.resolve(
      processConfig.RESOURCES.RENDERER.STATICS_PATH,
      moduleConfig.name + ".html"
    );

    if (moduleConfig && fs.existsSync(possibleSourcePath)) {
      log.info("Fetching local resource for window:", possibleSourcePath);

      return window.loadURL(formatUrl({
        pathname: possibleSourcePath,
        protocol: "file",
        slashes: true
      }));
    } else {
      throw new Error(`Cannot find resource for unknown path: '${moduleName}/${possibleSourcePath}'.`);
    }
  }
}
