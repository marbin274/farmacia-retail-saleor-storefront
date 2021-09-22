import React from 'react';

export type BreadcrumbType = {
  label: string;
  link: string;
};

export type BreadcrumbsProps = {
  baseLabel?: string;
  baseUrl?: string;
  breadcrumbs: BreadcrumbType[];
  homeIcon?: React.ReactNode;
  minDesktopBreakpoint?: number;
  onClickOpen?: () => void;
  showBaseLabel?: boolean;
};

export type BreadcrumbChildProps = {
  baseLabel?: string;
  baseUrl: string;
  breadcrumbs: BreadcrumbType[];
  breadcrumbsLength: number;
  onClickNav: (path: string) => void;
};
