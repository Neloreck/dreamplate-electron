import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { Route, Router as ReactRouter } from "react-router";
import { Switch } from "react-router-dom";

// Data.
import { routerContextManager } from "@Main/data/store";

/*
 * Application submodules:
 */

import { HomeRouter } from "@Module/home";

/* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */

export class Router extends PureComponent {

  public render(): ReactNode {

    const { routingState: { history } } = routerContextManager.context;

    return (
      <ReactRouter history={history}>

        <Switch>

          <Route exact={true} path={"*"} component={HomeRouter}/>

        </Switch>

      </ReactRouter>
    );
  }

}
