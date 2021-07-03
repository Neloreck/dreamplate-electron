import { app as electronApplication } from "electron";

import { log } from "#/macroses/log.macro";
import { TOptional } from "@/lib/types";
import { processConfig } from "~/configs/ProcessConfig";
import { EWindowEvent } from "~/types/window";
import { Run } from "~/utils/general";
import { AbstractWindow } from "~/windows/AbstractWindow";
import { MainWindow } from "~/windows/MainWindow";

@Run()
export class ElectronApplication {

  public static activeWindow: TOptional<AbstractWindow> = null;

  public static main(): void {
    log.info("Initializing electron application, mode:", processConfig.ENVIRONMENT);

    electronApplication.on("ready", ElectronApplication.onApplicationReady);
    electronApplication.on("window-all-closed", ElectronApplication.onApplicationWindowsClosed);
    electronApplication.on("activate", ElectronApplication.onApplicationActivated);
  }

  public static onApplicationReady(): void {
    log.info("ElectronApplication ready");

    ElectronApplication.activeWindow = new MainWindow();
    ElectronApplication.activeWindow.addListener(EWindowEvent.CLOSED, ElectronApplication.onActiveWindowDestroy);
  }

  public static onApplicationActivated(): void {
    log.info("ElectronApplication activated");

    if (ElectronApplication.activeWindow === null) {
      ElectronApplication.activeWindow = new MainWindow();
      ElectronApplication.activeWindow.addListener(EWindowEvent.CLOSED, ElectronApplication.onActiveWindowDestroy);
    }
  }

  public static onApplicationWindowsClosed(): void {
    log.info("All application windows closed");

    if (process.platform !== "darwin") {
      electronApplication.quit();
    }
  }

  public static onActiveWindowDestroy(): void {
    log.info("Active window destroyed");

    ElectronApplication.activeWindow = null;
  }

}
