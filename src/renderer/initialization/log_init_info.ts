import { log } from "#/macroses/log.macro";

/**
 * Log greeting and page load information.
 */
export function logInitInfo(): void {
  log.info("Starting renderer in DEV mode.");
}
