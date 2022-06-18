import { GeneralIpcHandler } from "@/process/ipc";
import { AbstractIpcHandler } from "@/process/utils/ipc";

export class GlobalIpcManager {

  public managers: Array<AbstractIpcHandler> = [ new GeneralIpcHandler() ];

  public setup(): this {
    this.managers.forEach((it) => it.setupHandlers());

    return this;
  }

  public dispose(): this {
    this.managers.forEach((it) => it.disposeHandlers());

    return this;
  }

}
