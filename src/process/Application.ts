import "reflect-metadata";

import { app as electronApplication, BrowserWindow } from "electron";

import { log } from "#/macroses/log.macro";
import { Optional, Maybe } from "@/lib/types";
import { processConfig } from "@/process/configs/ProcessConfig";
import { GlobalIpcManager } from "@/process/ipc/GlobalIpcManager";
import { EWindowEvent } from "@/process/types/window";
import { installExtensions } from "@/process/utils/electron/debug";
import { Run } from "@/process/utils/general";
import { MainWindow } from "@/process/windows/MainWindow";

@Run()
export class Application {

  public static mainWindow: Optional<MainWindow> = null;
  public static ipcManager: Optional<GlobalIpcManager> = null;

  public static async main(): Promise<void> {
    log.info("Initializing electron renderer, mode:", processConfig.ENVIRONMENT);

    /**
     * Do not open copy application instance.
     */
    if (!electronApplication.requestSingleInstanceLock()) {
      return electronApplication.quit();
    }

    electronApplication.on("window-all-closed", Application.onApplicationWindowsClosed);
    electronApplication.on("second-instance", Application.onApplicationSecondInstance);
    electronApplication.on("activate", Application.onApplicationActivated);
    electronApplication.on("certificate-error", Application.onCertificateError);

    Application.setupIpc();

    await electronApplication.whenReady();
    await Application.createMainWindow();
  }

  public static async createMainWindow(): Promise<void> {
    log.info("Creating main window");

    if (processConfig.DEVELOPMENT.WEB_EXTENSIONS.ENABLED) {
      await installExtensions();
    }

    Application.mainWindow = new MainWindow();
    Application.mainWindow.addListener(EWindowEvent.CLOSED, Application.onActiveWindowDestroy);
  }

  public static setupIpc(): void {
    log.info("Setup application IPC");

    Application.ipcManager = new GlobalIpcManager().setup();
  }

  public static async onApplicationActivated(): Promise<void> {
    log.info("Application activated");

    if (Application.mainWindow === null) {
      await Application.createMainWindow();
    }
  }

  public static onApplicationWindowsClosed(): void {
    log.info("All renderer windows closed");

    if (process.platform !== "darwin") {
      electronApplication.quit();
    }
  }

  public static onActiveWindowDestroy(): void {
    log.info("Active window destroyed");

    Application.mainWindow = null;
  }

  public static onApplicationSecondInstance(): void {
    log.info("Second instance open");

    const activeWindow: Maybe<BrowserWindow> = Application?.mainWindow?.browserWindow;

    if (activeWindow) {
      if (activeWindow.isMinimized()) {
        activeWindow.restore();
      }

      activeWindow.focus();
    }
  }

  public static onCertificateError(
    event: Event,
    webContents: unknown,
    url: string,
    error: string,
    certificate: unknown,
    callback: (isTrusted: boolean) => void
  ): void {
    /* <dev> */
    const isDevHost: boolean =
      (processConfig.IS_DEVELOPMENT && url.startsWith(processConfig.DEVELOPMENT.SERVER.URL)) ||
      url.startsWith(processConfig.DEVELOPMENT.SERVER.HMR_URL);

    if (isDevHost) {
      event.preventDefault();
      callback(true);

      return;
    }
    /* </dev> */

    log.warn("Certificate error:", error);
  }

}
