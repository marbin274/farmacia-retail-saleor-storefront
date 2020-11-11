import * as React from "react";

export enum OverlayType {
  cart = "cart",
  checkout = "checkout",
  login = "login",
  message = "message",
  sideNav = "side-nav",
  password = "password",
  search = "search",
  mainMenuNav = "main-menu-nav",
  modal = "modal",
  register = "register",
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal",
  center = "center",
}

export type InnerOverlayContextInterface = {
  title?: string
  content?: string | React.ReactNode
  status?: "success" | "error"
  data?: any
} | null

export type ShowOverlayType = (
  type: OverlayType,
  theme?: OverlayTheme,
  context?: InnerOverlayContextInterface
) => void;

export interface OverlayContextInterface {
  type: OverlayType | undefined;
  theme: OverlayTheme | undefined;
  context: InnerOverlayContextInterface | undefined;
  show: ShowOverlayType;
  hide(): void;
  showCatalog(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  context: null,
  hide: () => {},
  show: type => {},
  showCatalog: () => {},
  theme: undefined,
  type: undefined,
});
/* tslint:enable:no-empty */

OverlayContext.displayName = "OverlayContext";
