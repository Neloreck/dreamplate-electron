import * as React from "react";
import { ComponentClass, PureComponent, ReactNode } from "react";
import { Route, Switch } from "react-router";

// Lib.
import { log } from "@Lib/utils/logger";

// View.
import { ErrorPage } from "@Main/view/pages/ErrorPage";
import { lazyLoadComponentFactory } from "@Main/view/utils";

// Submodules.
const HomePage: ComponentClass = lazyLoadComponentFactory.getComponent(
  () => import(/* webpackChunkName: "home@home-page" */"@Module/home/view/pages/HomePage")
);

export class HomeRouter extends PureComponent {

  public componentDidMount(): void {
    log.info("Home module mounted.");
  }

  public render(): ReactNode {

    return (
      <Switch>

        <Route exact={true} path={["/", "/home"]} component={HomePage}/>
        <Route exact={true} path={"*"} component={ErrorPage}/>

      </Switch>
    );
  }

}
