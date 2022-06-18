import { EIpcSignal, EIpcMeta, Constructor } from "@/lib/types";
import { createMethodDecorator } from "@/lib/utils";

export function OnIpcEvent(event: EIpcSignal) {
  return createMethodDecorator((method: string | symbol, target: Constructor) => {
    const meta: Record<string | symbol, Array<EIpcSignal>> = getIpcHandlers(target);

    meta[method] = [ ...(meta[method] || []), event ];

    Reflect.defineMetadata(EIpcMeta.HANDLERS, meta, target);
  });
}

export function getIpcHandlers(
  target: Constructor<any>
): Record<string | symbol, Array<EIpcSignal>> {
  return Reflect.getMetadata(EIpcMeta.HANDLERS, target) || {};
}
