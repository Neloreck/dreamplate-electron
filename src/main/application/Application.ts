import { app as application } from "electron";

// Lib.
import { AbstractWindow } from "@Lib/window";
import { EntryPoint } from "@Lib/decorators";

// View.
import { MainWindow } from "@Application/windows/MainWindow";

@EntryPoint()
export class Application {

  public static activeWindow: AbstractWindow | null = null;

  public static main(): void {
    this.init();
  }

  public static init(): void {

    application.on("ready", () => {
      this.activeWindow = new MainWindow();
      this.activeWindow.init();
      this.activeWindow.afterClosed(this.onActiveWindowDestroy);
    });

    application.on("window-all-closed", () => {
      if (process.platform !== "darwin") {
        application.quit()
      }
    });

    application.on("activate", () => {
      if (this.activeWindow === null) {
        this.activeWindow = new MainWindow();
        this.activeWindow.init();
        this.activeWindow.afterClosed(this.onActiveWindowDestroy);
      }
    });
  }

  public static onActiveWindowDestroy(): void {
    Application.activeWindow = null;
  }

}
