import { BrowserWindow } from "electron";

export abstract class AbstractWindow {

  protected abstract window: BrowserWindow;

  public abstract init(): void;

  public afterClosed(fn: () => any): void {
    this.window.addListener("closed", fn);
  }

}
