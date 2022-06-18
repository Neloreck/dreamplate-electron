import { ReactElement, useLayoutEffect } from "react";

export function DefaultErrorFallback({ reload = true, redirect = true }): ReactElement {
  useLayoutEffect(() => {
    if (redirect) {
      window.location.href = `/error?origin=${encodeURIComponent(window.location.href)}`;
    } else if (reload) {
      window.location.reload();
    }
  }, []);

  return <div />;
}
