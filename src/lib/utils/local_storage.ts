import { Optional } from "@/lib/types";

/**
 * Encrypt function for local storage.
 */
export function encrypt(value: string): string {
  return btoa(value);
}

/**
 * Decrypt function for local storage.
 */
export function decrypt(value: string): string {
  return atob(value);
}

/**
 * Decrypt function for local storage.
 */
export function parse<T>(value: string): Optional<T> {
  return JSON.parse(decrypt(value));
}

/**
 * Get value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export function getFromLocalStorage<T>(key: string): Optional<T> {
  const raw: string | null = localStorage.getItem(encrypt(key)) || null;

  return raw === null ? null : parse(raw);
}

/**
 * Set value by key from localstorage.
 * Key and value are encrypted in B64.
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  localStorage.setItem(encrypt(key), encrypt(JSON.stringify(value)));
}

/**
 * Remove value by key from local storage.
 * Key and value are encrypted in B64.
 */
export function removeLocalStorageItem(key: string): void {
  return localStorage.removeItem(encrypt(key));
}
