import { BrowserWindow } from "electron";

import { TCallable } from "@/lib/types";
import { EWindowEvent } from "~/types/window";

export abstract class AbstractWindow {

  protected window: BrowserWindow;

  public constructor() {
    this.window = this.initialize();

    this.register();
    this.load();
  }

  public addListener(event: EWindowEvent, listener: TCallable): BrowserWindow {
    return this.window.addListener(event, listener);
  }

  public removeListener(event: EWindowEvent, listener: TCallable): BrowserWindow {
    return this.window.removeListener(event, listener);
  }

  protected abstract initialize(): BrowserWindow;

  protected abstract register(): void;

  protected abstract load(): void;

}

