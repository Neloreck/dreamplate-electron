/**
 * Callable method with generic params and return.
 */
export type Callable = () => void;

/**
 * Optional generic.
 */
export type Optional<T> = T | null;

/**
 * Maybe generic.
 */
export type Maybe<T> = T | null | undefined;

/**
 * Any generic object.
 */
export type AnyObject<T = any> = Record<string, T>;

/**
 * Any empty object.
 */
export type EmptyObject = Record<string, never>;

/**
 * Generic constructor.
 */
export type Constructor<T = any> = {
  new (...args: unknown[]): T;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ClassElement {
  kind: "field" | "method";
  key: PropertyKey;
  placement: "static" | "prototype" | "own";
  initializer?: () => void | undefined;
  extras?: ClassElement[];
  finisher?: <T>(clazz: Constructor<T>) => void | undefined | Constructor<T>;
  descriptor?: PropertyDescriptor;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface MethodDescriptor extends ClassElement {
  kind: "method";
  descriptor: PropertyDescriptor;
}
