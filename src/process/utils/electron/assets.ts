import * as fs from "fs";
import * as path from "path";
import { format as formatUrl } from "url";

import { log } from "#/macroses/log.macro";
import { Optional } from "@/lib/types";
import { processConfig } from "@/process/configs/ProcessConfig";
import { IModuleDefinition, EApplicationWindow } from "@/process/types";
import { default as modulesConfig } from "@/renderer/modules/modules.json";

/**
 * Get entry file path for a specified module.
 * Throws exception if file is not found.
 */
export function resolveModuleHtmlEntry(windowName: EApplicationWindow): string {
  const moduleConfig: undefined | IModuleDefinition = [ ...modulesConfig.modules ].find(
    (it: IModuleDefinition) => it.name === windowName
  );

  if (!moduleConfig) {
    throw new Error(`Cannot find resources for undefined module: '${windowName}'.`);
  }

  log.info("Resolving html entry for module:", windowName);

  return resolveAssetEntry(`html/${moduleConfig.name}.html`, {
    protocol: "file"
  });
}

/**
 * Get asset path.
 */
export function resolveAssetEntry(
  assetPath: string,
  {
    isLocalForced = false,
    protocol = null
  }: { isLocalForced?: boolean; protocol?: Optional<string> } = {}
): string {
  if (isLocalForced || !processConfig.DEVELOPMENT.IS_SERVED) {
    const possibleSourcePath: string = path.resolve(
      processConfig.RESOURCES.RENDERER.STATICS_PATH,
      `./${assetPath}`
    );

    if (fs.existsSync(possibleSourcePath)) {
      return protocol
        ? formatUrl({
          pathname: possibleSourcePath,
          protocol,
          slashes: true
        })
        : possibleSourcePath;
    } else {
      log.error("Cannot find resource for unknown path:", possibleSourcePath);
      throw new Error(`Cannot find resource for unknown path: '${possibleSourcePath}'.`);
    }
  } else {
    return `${processConfig.DEVELOPMENT.SERVER.URL}/${assetPath}`;
  }
}
