import { CliLogger } from "@Lib/utils/logger/CliLogger";
import { Logger } from "@Lib/utils/logger/Logger";

export const log: Logger = new Logger("[✴️‍️APP]");
export const cliLog: CliLogger = new CliLogger("[✴️‍️APP]");

export { Logger } from "@Lib/utils/logger/Logger";
