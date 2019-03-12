/* tslint:disable: no-console */

export class CliLogger {

  private readonly prefix: string;
  private readonly enabled: boolean = true;

  public constructor(prefix: string, enabled?: boolean) {
    this.prefix = prefix;

    if (enabled !== undefined) {
      this.enabled = enabled;
    }
  }
  // Functional methods.

  public getPrefixed(prefix: string, enabled?: boolean): CliLogger {
    return new CliLogger(this.prefix + " " + prefix, enabled);
  }

  public debug(...args: Array<any>): void {
    if (this.enabled) {
      console.debug(`${this.prefix}`, "[D]", ...args);
    }
  }

  public warn(...args: Array<any>): void {
    if (this.enabled) {
      console.warn(`${this.prefix}`, ...args);
    }
  }

  public error(...args: Array<any>): void {
    console.error(`${this.prefix}`, ...args);
  }

  public info(...args: Array<any>): void {
    if (this.enabled) {
      console.info(`${this.prefix}`, ...args);
    }
  }

}
