import { ipcMain, ipcRenderer } from "electron";

/*
 * Decorators for full-time static functions.
 * Allows to subscribe for interaction channels between renderer and main process.
 */

export const IpcMainHandler = (eventChannel: string): MethodDecorator => (target: any, propertyKey: string | symbol): void => {
  ipcMain.on(eventChannel, target[propertyKey]);
};

export const IpcRendererHandler = (eventChannel: string): MethodDecorator => (target: any, propertyKey: string | symbol): void => {
  ipcRenderer.on(eventChannel, target[propertyKey]);
};
