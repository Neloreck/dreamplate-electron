import { BrowserWindow, Menu } from "electron";

import { log } from "#/macroses/log.macro";
import { Optional } from "@/lib/types";
import { processConfig } from "@/process/configs/ProcessConfig";
import { EApplicationWindow } from "@/process/types";
import { resolveModuleHtmlEntry } from "@/process/utils/electron";
import { AbstractWindow } from "@/process/windows/AbstractWindow";
import { MainWindowMenuBuilder } from "@/process/windows/MainWindowMenuBuilder";

export class AboutWindow extends AbstractWindow {

  protected initialize(): BrowserWindow {
    log.info("Initializing about window");

    return new BrowserWindow({
      height: 100,
      minHeight: 100,
      minWidth: 200,
      width: 200,
      fullscreenable: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: processConfig.RESOURCES.PRELOAD.MAIN_BRIDGE_PATH
      }
    });
  }

  protected initializeMenu(): Optional<Menu> {
    return new MainWindowMenuBuilder(this).buildMenu();
  }

  protected async load(): Promise<void> {
    try {
      await this.browserWindow.loadURL(resolveModuleHtmlEntry(EApplicationWindow.ABOUT));
    } catch (error) {
      log.error("Failed to load source for process window:", error);
    }
  }

}
