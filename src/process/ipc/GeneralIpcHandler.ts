import * as os from "os";

import { IpcMainEvent } from "electron";

import { log } from "#/macroses/log.macro";
import { EIpcSignal } from "@/lib/types";
import { AbstractIpcHandler, OnIpcEvent } from "@/process/utils/ipc";

export class GeneralIpcHandler extends AbstractIpcHandler {

  @OnIpcEvent(EIpcSignal.GET_APPLICATION_ABOUT_INFO)
  public onAboutInfo(event: IpcMainEvent): void {
    log.info("About info requested");

    event.returnValue = {
      nodeVersion: process.versions.node,
      v8: process.versions.v8,
      chrome: process.versions.chrome,
      electron: process.versions.electron,
      osVersion: os.version(),
      osPlatform: os.platform(),
      osArch: os.arch()
    };
  }

  @OnIpcEvent(EIpcSignal.PING)
  public onPing(event: IpcMainEvent): void {
    log.info("Ping received");

    event.sender.send(EIpcSignal.PONG);
  }

}
