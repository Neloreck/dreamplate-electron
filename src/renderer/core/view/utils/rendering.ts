import { ComponentType, createElement, ReactElement, StrictMode, ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { applicationConfig } from "@/renderer/core/data/configs";
import { Root } from "@/renderer/core/Root";

/**
 * Render renderer root node wrapped with global context based on current environment.
 */
export function renderRoot(
  children: ComponentType,
  target: HTMLElement = applicationConfig.TARGET_DOM_ELEMENTS.applicationRoot
): void {
  const content: ReactElement = createElement(children);
  const node: ReactNode = createElement(Root, {}, content);

  createRoot(target!).render(node as any);
}
