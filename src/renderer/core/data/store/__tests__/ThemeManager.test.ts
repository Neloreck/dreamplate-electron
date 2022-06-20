import { mockManager } from "dreamstate/test-utils";

import { TThemeType, IApplicationTheme, toggleTheme } from "@/lib/theme";
import { encrypt, setLocalStorageItem } from "@/lib/utils";
import { ThemeManager } from "@/renderer/core/data/store";

describe("Theme context manager.", () => {
  it("Should properly initialize.", () => {
    const manager: ThemeManager = mockManager(ThemeManager);
    const { theme } = manager.context;

    expect(theme.palette.type).toBe(GTheme.DEFAULT_THEME_TYPE);
  });

  it("Should toggle theme correctly.", () => {
    const manager: ThemeManager = mockManager(ThemeManager);

    expect(manager.context.theme.palette.type).toBe("dark");

    manager.toggleTheme();

    expect(manager.context.theme.palette.type).toBe("light");
  });

  it("Should load preset from local storage.", () => {
    setLocalStorageItem("theme_type", "dark");

    const manager: ThemeManager = mockManager(ThemeManager);

    expect(manager.context.theme.palette.type).toBe("dark");
  });

  it("Should handle events from other tabs.", async () => {
    const manager: ThemeManager = mockManager(ThemeManager);

    const defaultThemeValue: TThemeType = manager.context.theme.palette.type;
    const nextTheme: IApplicationTheme = toggleTheme(manager.context.theme);

    manager["onLocalStorageDataChanged"]({
      key: encrypt("theme_type"),
      newValue: encrypt(JSON.stringify(nextTheme.palette.type))
    } as StorageEvent);

    expect(manager.context.theme.palette.type).toBe(nextTheme.palette.type);
    expect(manager.context.theme.palette.type).not.toBe(defaultThemeValue);
  });
});
