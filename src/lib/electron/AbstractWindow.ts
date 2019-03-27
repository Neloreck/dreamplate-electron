import { BrowserWindow } from "electron";

export abstract class AbstractWindow {

  protected abstract window: BrowserWindow;

  public listenAfterClosed(fn: () => any): void {
    this.window.addListener("closed", fn);
  }

}
