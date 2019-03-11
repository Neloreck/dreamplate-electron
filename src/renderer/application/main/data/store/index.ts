import { AuthContextManager } from "@Main/data/store/AuthContextManager";
import { ThemeContextManager } from "@Main/data/store/ThemeContextManager";

export const authContextManager: AuthContextManager = new AuthContextManager();
export const themeContextManager: ThemeContextManager = new ThemeContextManager();

export { AuthContextManager, IAuthContext } from "@Main/data/store/AuthContextManager";
export { ThemeContextManager, IThemeContext } from "@Main/data/store/ThemeContextManager";
