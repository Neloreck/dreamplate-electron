import { BrowserWindow } from "electron";

// Lib.
import { AbstractWindow } from "@Lib/electron";

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
    this.window.webContents.openDevTools();
  }

}
