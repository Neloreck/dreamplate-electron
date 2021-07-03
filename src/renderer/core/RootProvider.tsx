import { useManager } from "dreamstate";
import { ReactElement, ReactNode, Suspense } from "react";
import { JssProvider, ThemeProvider } from "react-jss";
import { MemoryRouter as ReactRouter } from "react-router";

import { ThemeManager } from "@/core/data/store";

/**
 * Root provider for application.
 */
export function RootProvider({
  children = null as ReactNode,
  themeContext: { theme } = useManager(ThemeManager)
}): ReactElement {
  return (
    <ReactRouter>
      <JssProvider id={ThemeManager.JSS_ID_GENERATION_CONFIG}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<div> Loading </div>}>
            { children }
          </Suspense>
        </ThemeProvider>
      </JssProvider>
    </ReactRouter>
  );
}
