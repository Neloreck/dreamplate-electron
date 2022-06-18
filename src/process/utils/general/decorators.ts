import { Constructor } from "@/lib/types";
import { isFunction } from "@/lib/utils";

export interface IClassElement {
  kind: "field" | "method";
  key: PropertyKey;
  placement: "static" | "prototype" | "own";
  initializer?: () => void | undefined;
  extras?: Array<IClassElement>;
  finisher?: <T>(clazz: Constructor<T>) => void | undefined | Constructor<T>;
  descriptor?: PropertyDescriptor;
}

export interface IClassDescriptor {
  kind: "class";
  elements: Array<IClassElement>;
  finisher?: <T>(clazz: Constructor<T>) => void | Constructor<T>;
}

export function createClassWrapDecorator<D>(resolver: (c: D) => D): ClassDecorator {
  return function <T> (classOrDescriptor: T) {
    // Legacy decorators and ES proposal.
    if (isFunction(classOrDescriptor)) {
      return resolver(classOrDescriptor as any);
    } else {
      (classOrDescriptor as any as IClassDescriptor).finisher = function (wrappedComponent: T) {
        return resolver(wrappedComponent as any);
      } as any;

      return classOrDescriptor as any;
    }
  };
}
