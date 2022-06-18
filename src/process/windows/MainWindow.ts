import { BrowserWindow, Menu } from "electron";

import { log } from "#/macroses/log.macro";
import { Optional } from "@/lib/types";
import { processConfig } from "@/process/configs/ProcessConfig";
import { EApplicationWindow } from "@/process/types";
import { resolveModuleHtmlEntry } from "@/process/utils/electron";
import { AbstractWindow } from "@/process/windows/AbstractWindow";
import { MainWindowMenuBuilder } from "@/process/windows/MainWindowMenuBuilder";

export class MainWindow extends AbstractWindow {

  protected initialize(): BrowserWindow {
    log.info("Initializing main window");

    const browserWindow: BrowserWindow = new BrowserWindow({
      height: 460,
      minHeight: 460,
      minWidth: 800,
      width: 800,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: processConfig.RESOURCES.PRELOAD.MAIN_BRIDGE_PATH
      }
    });

    browserWindow.webContents.setWindowOpenHandler(() => ({ action: "deny" }));

    return browserWindow;
  }

  protected initializeMenu(): Optional<Menu> {
    return new MainWindowMenuBuilder(this).buildMenu();
  }

  protected async load(): Promise<void> {
    try {
      const htmlUrl: string = resolveModuleHtmlEntry(EApplicationWindow.MAIN);

      log.info(
        "Loading assets for main window",
        htmlUrl,
        processConfig.RESOURCES.PRELOAD.MAIN_BRIDGE_PATH
      );

      await this.browserWindow.loadURL(htmlUrl);
    } catch (error) {
      log.error("Failed to load source for process window:", error);
    }
  }

  protected register(): void {
    this.browserWindow.on("closed", () => log.info("Closed process window"));
  }

}
