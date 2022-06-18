/**
 * Utility function to check whether supplied parameter is an object.
 */
export function isObject<T>(target: T): boolean {
  return typeof target === "object" && target !== null;
}

/**
 * Utility function to check whether supplied parameter is a function.
 */
export function isFunction<T>(target: T): boolean {
  return typeof target === "function";
}

/**
 * Utility function to check whether supplied parameter is undefined.
 */
export function isUndefined<T>(target: T): boolean {
  return typeof target === "undefined";
}
