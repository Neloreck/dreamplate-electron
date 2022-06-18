import { log } from "#/macroses/log.macro";
import { processConfig } from "@/process/configs/ProcessConfig";

export async function installExtensions(): Promise<void> {
  const installer = require("electron-devtools-installer");

  return installer
    .default(
      processConfig.DEVELOPMENT.WEB_EXTENSIONS.LIST.map((name: string) => installer[name]),
      processConfig.DEVELOPMENT.WEB_EXTENSIONS.UPGRADE
    )
    .catch((error: Error) => log.error("Extensions installation failed:", error));
}
