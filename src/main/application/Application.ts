import { app as electronApplication } from "electron";

// Lib.
import { EntryPoint } from "@Lib/decorators";
import { AbstractWindow } from "@Lib/electron";
import { cliLog } from "@Lib/utils";

// Data.
import { applicationConfig } from "@Application/configs/ApplicationConfig";

// View.
import { MainWindow } from "@Application/windows/MainWindow";

@EntryPoint()
export class Application {

  public static activeWindow: AbstractWindow | null = null;

  public static main(): void {

    cliLog.info("Initializing electron application. Current mode:", applicationConfig.mode);

    electronApplication.on("ready", Application.onApplicationReady);
    electronApplication.on("window-all-closed", Application.onApplicationWindowsClosed);
    electronApplication.on("activate", Application.onApplicationActivated);
  }

  public static onApplicationReady(): void {

    cliLog.info("Application ready.");

    Application.activeWindow = new MainWindow();
    Application.activeWindow.listenAfterClosed(Application.onActiveWindowDestroy);
  }

  public static onApplicationActivated(): void {

    cliLog.info("Application activated.");

    if (Application.activeWindow === null) {
      Application.activeWindow = new MainWindow();
      Application.activeWindow.listenAfterClosed(Application.onActiveWindowDestroy);
    }
  }

  public static onApplicationWindowsClosed(): void {

    cliLog.info("All application windows closed.");

    if (process.platform !== "darwin") {
      electronApplication.quit();
    }
  }

  public static onActiveWindowDestroy(): void {

    cliLog.info("Active window destroyed.");

    Application.activeWindow = null;
  }

}
