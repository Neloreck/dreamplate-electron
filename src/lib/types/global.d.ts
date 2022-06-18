import type * as colors from "#/globals/colors";
import type * as theme from "#/globals/theme";
import type { IEnvironmentInfo } from "@/bridge/types";

declare global {
  /**
   * Global definition for dev mode flag.
   */
  const IS_DEV: boolean;

  const EnvironmentInfo: IEnvironmentInfo;

  /**
   * Global definition for test mode flag.
   */
  const IS_TEST: boolean | undefined;

  /**
   * Global definition for serve mode flag.
   */
  const IS_SERVED: boolean | undefined;

  /**
   * Global definition for package flag.
   */
  const IS_PACKAGED: boolean | undefined;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GColor: typeof colors;

  /**
   * Global colors definitions for build time evaluation.
   */
  const GTheme: typeof theme;
}
