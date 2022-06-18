import { Constructor, AnyObject, MethodDescriptor } from "@/lib/types";

export function createMethodDecorator<T extends Constructor<any>>(
  resolver: (method: string | symbol, constructor: T) => void
): MethodDecorator {
  return function (prototypeOrDescriptor: AnyObject, method: string | symbol) {
    if (prototypeOrDescriptor && method) {
      resolver(method, prototypeOrDescriptor.constructor as T);

      return prototypeOrDescriptor;
    } else {
      (prototypeOrDescriptor as MethodDescriptor).finisher = function (targetClass: any) {
        resolver((prototypeOrDescriptor as MethodDescriptor).key as string, targetClass as T);
      };

      return prototypeOrDescriptor;
    }
  };
}
