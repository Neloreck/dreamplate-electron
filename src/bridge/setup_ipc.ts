import { ipcRenderer } from "electron";

import { log } from "#/macroses/log.macro";
import { EIpcSignal } from "@/lib/types";

export function setupIpc(): void {
  log.info("Setup IPC handlers");

  ipcRenderer.on(EIpcSignal.PONG, () => log.info("Pong received back"));
}
