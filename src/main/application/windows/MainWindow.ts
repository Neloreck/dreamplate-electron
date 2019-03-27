import { BrowserWindow } from "electron";

// Lib.
import { AbstractWindow } from "@Lib/electron";

// Data.
import { applicationConfig } from "@Application/configs/ApplicationConfig";

export class MainWindow extends AbstractWindow {

  protected window: BrowserWindow = new BrowserWindow({
    height: 360,
    minHeight: 360,
    minWidth: 640,
    webPreferences: {
      nodeIntegration: true
    },
    width: 640
  });

  public constructor() {

    super();

    this.window.on("closed", () => delete this.window);

    // todo: Proper resources handling.
    this.window.loadFile("target/application/index.html");

    if (applicationConfig.isDev) {
      this.window.webContents.openDevTools();
    }
  }

}
