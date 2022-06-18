import { ipcMain } from "electron";

import { AnyObject } from "@/lib/types";
import { EIpcSignal } from "@/lib/types/ipc";

export function emitProcessIpcEvent<T extends AnyObject>(type: EIpcSignal, signal?: T): boolean {
  return ipcMain.emit(type, signal);
}
