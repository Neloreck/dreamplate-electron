import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { ErrorPage } from "@/renderer/modules/error/view/pages";
import { MainPage } from "@/renderer/modules/main/view/pages";

export function MainRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"/"} element={<MainPage />} />
      <Route path={"/main"} element={<MainPage />} />
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
}
