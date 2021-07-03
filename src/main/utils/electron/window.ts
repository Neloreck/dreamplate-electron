import * as fs from "fs";
import * as path from "path";

import { IModuleDefinition } from "#/config";
import { default as modulesConfig } from "@/modules/modules.json";
import { processConfig } from "~/configs/ProcessConfig";

/**
 * Get entry file path for a specified module.
 * Throws exception if file is not found.
 */
export function getSourcePathForModule(moduleName: string): string {
  const moduleConfig: undefined | IModuleDefinition = [ ...modulesConfig.modules ]
    .find((it: IModuleDefinition) => it.name === moduleName);
  const possibleSourcePath: string = path.resolve(processConfig.RESOURCES.RENDERER, (moduleConfig?.name) + ".html");

  if (moduleConfig && fs.existsSync(possibleSourcePath)) {
    return possibleSourcePath;
  } else {
    throw new Error(`Cannot find source for unknown module: '${moduleName}/${possibleSourcePath}'.`);
  }
}
