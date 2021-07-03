import { BrowserWindow } from "electron";

import { log } from "#/macroses/log.macro";
import { getSourcePathForModule } from "~/utils/electron";
import { AbstractWindow } from "~/windows/AbstractWindow";

export class MainWindow extends AbstractWindow {

  protected initialize(): BrowserWindow {
    return new BrowserWindow({
      height: 360,
      minHeight: 360,
      minWidth: 640,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      },
      width: 640
    });
  }

  protected async load(): Promise<void> {
    try {
      await this.window.loadFile(getSourcePathForModule("main"));
    } catch (error) {
      log.error("Failed to load source for main window:", error);
    }
  }

  protected register(): void {
    this.window.on("closed", () => log.info("Closed main window"));
  }

}
