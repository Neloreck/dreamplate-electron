import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { AboutPage } from "@/renderer/modules/about/view";
import { ErrorPage } from "@/renderer/modules/error/view/pages";

export function AboutRouter(): ReactElement {
  return (
    <Routes>
      <Route path={"/about"} element={<AboutPage />} />
      <Route element={<ErrorPage />} />
    </Routes>
  );
}
