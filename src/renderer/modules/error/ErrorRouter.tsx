import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@/renderer/modules/error/view/pages";

export function ErrorRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
}
