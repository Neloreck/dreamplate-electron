import { contextBridge, ipcRenderer } from "electron";

import { log } from "#/macroses/log.macro";
import { EIpcSignal } from "@/lib/types";

export function setupGlobals(): void {
  log.info("Setup bridge globals");

  contextBridge.exposeInMainWorld("EnvironmentInfo", {
    getVersions: () => ipcRenderer.sendSync(EIpcSignal.GET_APPLICATION_ABOUT_INFO),
    sendPing: () => {
      ipcRenderer.send(EIpcSignal.PING);
      log.info("Ping sent");
    }
  });
}
