import { useManager } from "dreamstate";
import { ReactElement } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

import { IApplicationTheme } from "@/lib/theme";
import { RouterManager } from "@/renderer/core/data/store";
import { MainHeader } from "@/renderer/core/view/components";

export const useStyles = createUseStyles(({ spacing }: IApplicationTheme) => ({
  content: {
    "& > button": {
      margin: spacing.unit * 2
    },
    alignItems: "center",
    alignSelf: "normal",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    overflowY: "auto",
    padding: spacing.unit * 2
  }
}));

export function AboutPage({
  classes: { content } = useStyles(),
  routerContext: { history } = useManager(RouterManager)
}): ReactElement {
  return (
    <>
      <MainHeader />

      <main className={content}>
        About page.
        <Link to={history.createHref("/process")} reloadDocument>
          <button>Go home</button>
        </Link>
      </main>
    </>
  );
}
