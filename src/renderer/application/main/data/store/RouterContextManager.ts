import { Bind, ContextManager } from "dreamstate";
import { createMemoryHistory, History } from "history";
import { createElement, ReactNode } from "react";
import { Router as ReactRouter } from "react-router";

// Lib.
import { Logger } from "@Lib/utils";

export interface IRouterContext {
  routingActions: {
    replace(path: string): void;
    push(path: string): void;
    goBack(): void;
    getCurrentLocation(): string;
  };
  routingState: {
    history: History;
  };
}

export class RouterContextManager extends ContextManager<IRouterContext> {

  protected context: IRouterContext = {
    routingActions: {
      getCurrentLocation: this.getCurrentLocation,
      goBack: this.goBack,
      push: this.push,
      replace: this.replace
    },
    routingState: {
      history: createMemoryHistory()
    }
  };

  private readonly log: Logger = new Logger("[🗺️ROUTER]", true);

  public getProvider<D extends { children: ReactNode }>(): any {
    // Create router wrapper with provider for app-level.
    return (props: D): ReactNode =>
      createElement(ReactRouter, { history: this.context.routingState.history },
        createElement(super.getProvider(), props, props.children)
      );
  }

  @Bind()
  public replace(path: string): void {

    this.log.info(`Replace path: ${path}.`);
    this.context.routingState.history.replace(path);
  }

  @Bind()
  public push(path: string): void {

    this.log.info(`Push path: ${path}.`);
    this.context.routingState.history.push(path);
  }

  @Bind()
  public goBack(): void {

    this.log.info("Go back.");
    this.context.routingState.history.goBack();
  }

  @Bind()
  public getCurrentLocation(): string {
    return this.context.routingState.history.location.pathname;
  }

  protected onProvisionStarted(): void {
    this.log.info("Routing context provision started.");
  }

}
