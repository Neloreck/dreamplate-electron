import { ipcMain } from "electron";

import { log } from "#/macroses/log.macro";
import { Constructor, AnyObject, Callable, Maybe, EIpcSignal } from "@/lib/types";
import { getIpcHandlers } from "@/process/utils/ipc";

export abstract class AbstractIpcHandler {

  public unSubscribers: Array<Callable> = [];

  public setupHandlers(): void {
    const meta: Record<string | symbol, Array<EIpcSignal>> = getIpcHandlers(
      this.constructor as Constructor
    );

    Object.entries(meta).forEach(([ method, events ]: [string, Array<EIpcSignal>]) => {
      const handler: Callable = (...args: Array<unknown>) => (this as AnyObject)[method](...args);

      events.forEach((it: EIpcSignal) => {
        log.info("Adding ICP handler:", it, this.constructor.name);

        this.unSubscribers.push(() => ipcMain.off(it, handler));
        ipcMain.on(it, handler);
      });
    });
  }

  public disposeHandlers(): void {
    while (this.unSubscribers.length) {
      const it: Maybe<Callable> = this.unSubscribers.pop();

      if (it) {
        log.info("Removing ICP handler:", it, this.constructor.name);
        it();
      }
    }
  }

}
