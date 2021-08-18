import * as React from 'react';

export enum OverlayType {
  cart = 'cart',
  checkout = 'checkout',
  login = 'login',
  mainMenuNav = 'main-menu-nav',
  message = 'message',
  modal = 'modal',
  outOfTime = 'outOfTime',
  password = 'password',
  register = 'register',
  search = 'search',
  sideNav = 'side-nav',
  underConstruction = 'under-construction',
}

export enum OverlayTheme {
  center = 'center',
  modal = 'modal',
  left = 'left',
  right = 'right',
}

export type InnerOverlayContextInterface = {
  title?: string;
  content?: string | React.ReactNode;
  status?: 'success' | 'error';
  data?: any;
} | null;

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
  hide: () => {
    // hide
  },
  show: (type) => {
    // show
  },
  showCatalog: () => {
    // show catalog
  },
  theme: undefined,
  type: undefined,
});
/* tslint:enable:no-empty */

OverlayContext.displayName = 'OverlayContext';
