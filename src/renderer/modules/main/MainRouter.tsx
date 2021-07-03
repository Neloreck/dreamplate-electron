import { ReactElement } from "react";
import { Route, Switch } from "react-router";

import { DefaultErrorFallback } from "@/core/view/layouts";
import { HomePage } from "@/modules/main/view/pages/HomePage";

export function MainRouter(): ReactElement {
  return (
    <Switch>
      <Route path={[ "/", "/home" ]} component={HomePage} exact={true}/>

      <Route component={DefaultErrorFallback}/>
    </Switch>
  );
}
