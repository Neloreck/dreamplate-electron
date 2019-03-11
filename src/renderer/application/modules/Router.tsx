import { Provide } from "dreamstate";
import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { Route, MemoryRouter as ReactRouter } from "react-router";
import { Switch } from "react-router-dom";

// Lib;
import { Wrapped } from "@Lib/decorators";

// Data
import { authContextManager, themeContextManager } from "@Main/data/store";

// View.
import { GlobalThemeProvider } from "@Main/view/layouts/GlobalThemeProvider";

/*
 * Application submodules:
 */

import { HomeRouter } from "@Module/home";

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

@Provide(authContextManager, themeContextManager)
@Wrapped(GlobalThemeProvider)
export class Router extends PureComponent {

  public render(): ReactNode {

    return (
      <ReactRouter>

        <Switch>

          <Route exact={true} path={"*"} component={HomeRouter}/>

        </Switch>

      </ReactRouter>
    );
  }

}
