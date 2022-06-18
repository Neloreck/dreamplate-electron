import { AnyObject } from "@/lib/types";

export interface IEnvironmentInfo {
  getVersions(): AnyObject;
  sendPing(): void;
}
