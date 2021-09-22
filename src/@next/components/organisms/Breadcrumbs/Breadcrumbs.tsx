import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BreadcrumbDesktop } from './BreadcrumbDesktop';
import { BreadcrumbMobile } from './BreadcrumbMobile';
import { BreadcrumbsProps } from './types';

const smallScreen = '600px';
const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbs, ...rest }) => {
  const router = useRouter();
  if (!breadcrumbs || breadcrumbs.length === 0)
    throw Error('Breadcrumbs prop need at least 1 element');

  const breakpoint = useMemo(() => {
    return rest.minDesktopBreakpoint
      ? `${rest.minDesktopBreakpoint}px`
      : smallScreen;
  }, [rest.minDesktopBreakpoint]);

  const breadcrumbsLength = useMemo(() => {
    return breadcrumbs.length;
  }, [breadcrumbs]);

  const isDesktopVersion = useMediaQuery({
    query: `(min-width: ${breakpoint})`,
  });

  const onClickNav = (path: string) => {
    router.push(path);
  };

  if (!isDesktopVersion)
    return (
      <BreadcrumbMobile
        baseUrl={rest.baseUrl!}
        baseLabel={rest.baseLabel}
        breadcrumbs={breadcrumbs}
        breadcrumbsLength={breadcrumbsLength}
        onClickNav={onClickNav}
        onClickOpen={rest.onClickOpen}
      ></BreadcrumbMobile>
    );
  return (
    <BreadcrumbDesktop
      baseUrl={rest.baseUrl!}
      baseLabel={rest.baseLabel}
      breadcrumbs={breadcrumbs}
      breadcrumbsLength={breadcrumbsLength}
      homeIcon={rest.homeIcon}
      onClickNav={onClickNav}
      showBaseLabel={rest.showBaseLabel}
    ></BreadcrumbDesktop>
  );
};

Breadcrumbs.defaultProps = {
  baseUrl: '/',
  baseLabel: 'Inicio',
};
export default Breadcrumbs;
