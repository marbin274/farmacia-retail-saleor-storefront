import { HomeIcon, NextIcon } from '@farmacia-retail/farmauna-components';
import classNames from 'classnames';
import React, { FC } from 'react';
import { BreadcrumbChildProps } from './types';

type IProps = BreadcrumbChildProps & {
  homeIcon?: React.ReactNode;
  showBaseLabel?: boolean;
};

export const BreadcrumbDesktop: FC<IProps> = ({
  baseLabel,
  baseUrl,
  breadcrumbs,
  breadcrumbsLength,
  homeIcon,
  onClickNav,
  showBaseLabel,
}) => {
  return (
    <ul className="fa-flex fa-flex-wrap fa-items-center" role="breadcrumbs">
      <li
        className="fa-cursor-pointer fa-flex fa-items-center"
        onClick={() => onClickNav(baseUrl)}
      >
        {homeIcon || (
          <HomeIcon
            data-testid="breadcrumb-home-icon"
            size={18}
            className="fa-text-neutral-dark"
          ></HomeIcon>
        )}
        {showBaseLabel ? (
          <span
            className="fa-font-normal fa-leading-6 fa-ml-2 fa-text-neutral-darkest fa-text-sm"
            role="breadcrumb-home-label"
          >
            {baseLabel}
          </span>
        ) : (
          <></>
        )}
      </li>
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={index} className="fa-flex fa-items-center fa-ml-2">
          <NextIcon
            size={12}
            className="fa-transform fa-translate-x-1 fa-translate-y-px"
          ></NextIcon>
          <span
            className={classNames(
              'fa-font-normal fa-leading-6 fa-ml-2 fa-text-neutral-darkest fa-text-sm',
              {
                'fa-font-semibold': index === breadcrumbsLength - 1,
                'fa-cursor-pointer': index < breadcrumbsLength - 1,
              }
            )}
            onClick={() =>
              index < breadcrumbsLength - 1 && onClickNav(breadcrumb.link)
            }
          >
            {breadcrumb.label}
          </span>
        </li>
      ))}
    </ul>
  );
};
