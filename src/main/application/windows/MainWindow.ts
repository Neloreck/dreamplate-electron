import { BrowserWindow } from "electron";

// Lib.
import { AbstractWindow } from "@Lib/window";

export class MainWindow extends AbstractWindow {

  protected window: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  public init(): void {
    this.window.on("closed", () => delete this.window);
    this.window.loadFile("../../../../../target/dist/index.html");
    this.window.webContents.openDevTools();
  }

}
