import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";

/* Stream routes: */
import {HomePage} from "@Module/home/view/pages/HomePage";

export class HomeRouter extends PureComponent {

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={`/`} component={HomePage}/>
        <Route exact={true} path={`/home`} component={HomePage}/>
        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
