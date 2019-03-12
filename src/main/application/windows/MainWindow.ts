import { BrowserWindow } from "electron";

// Lib.
import { AbstractWindow } from "@Lib/electron";

// Data.
import { applicationConfig } from "@Application/configs/ApplicationConfig";

export class MainWindow extends AbstractWindow {

  protected window: BrowserWindow = new BrowserWindow({
    height: 600,
    minHeight: 220,
    minWidth: 400,
    webPreferences: {
      nodeIntegration: true
    },
    width: 800
  });

  public init(): void {

    this.window.on("closed", () => delete this.window);

    this.window.loadFile("target/application/index.html");

    if (applicationConfig.isDev) {
      this.window.webContents.openDevTools();
    }
  }

}
