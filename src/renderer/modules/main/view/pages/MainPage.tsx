import { useManager } from "dreamstate";
import { ReactElement, useMemo, useCallback } from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

import { down } from "#/macroses/style.macro";
import { IApplicationTheme } from "@/lib/theme";
import { AnyObject } from "@/lib/types";
import { RouterManager } from "@/renderer/core/data/store";
import { MainHeader } from "@/renderer/core/view/components";

export const useStyles = createUseStyles(({ palette, spacing }: IApplicationTheme) => ({
  link: {
    "& a": {
      color: palette.text.primary
    },
    backgroundColor: palette.background.paper,
    display: "flex",
    justifyContent: "center",
    margin: spacing.unit * 2,
    padding: spacing.unit * 2,
    minWidth: spacing.unit * 15
  },
  content: {
    alignItems: "center",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.unit * 2,
    overflowY: "auto",
    overflowX: "hidden"
  },
  linksList: {
    [down("sm")]: {
      flexDirection: "column"
    },
    display: "flex",
    flexDirection: "row",
    padding: spacing.unit * 10
  }
}));

export function MainPage({
  classes: { content, link, linksList } = useStyles(),
  routerContext: { history } = useManager(RouterManager)
}): ReactElement {
  const aboutInfo: AnyObject = useMemo(() => EnvironmentInfo.getVersions(), []);

  const onSendPing = useCallback(() => EnvironmentInfo.sendPing(), []);

  return (
    <>
      <MainHeader />

      <main className={content}>
        <div className={linksList}>React / Electron / Dreamstate </div>

        <div>
          {Object.entries(aboutInfo).map(([ item, version ]) => (
            <div key={item}>
              {item}: {version}
            </div>
          ))}
        </div>

        <button onClick={onSendPing}>Send ping</button>

        <Link to={history.createHref("/about")}>
          <button>About</button>
        </Link>
      </main>
    </>
  );
}
