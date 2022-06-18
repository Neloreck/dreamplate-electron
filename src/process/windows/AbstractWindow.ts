import { BrowserWindow, Menu } from "electron";

import { Callable, Optional } from "@/lib/types";
import { EWindowEvent } from "@/process/types/window";

export abstract class AbstractWindow {

  public readonly browserWindow: BrowserWindow;

  public constructor() {
    this.browserWindow = this.initialize();
    this.browserWindow.setMenu(this.initializeMenu());

    this.register();
    this.load();
  }

  public addListener(event: EWindowEvent, listener: Callable): BrowserWindow {
    return this.browserWindow.addListener(event, listener);
  }

  public removeListener(event: EWindowEvent, listener: Callable): BrowserWindow {
    return this.browserWindow.removeListener(event, listener);
  }

  protected initializeMenu(): Optional<Menu> {
    return null;
  }

  protected abstract initialize(): BrowserWindow;

  protected register(): void {}

  protected abstract load(): void;

}
