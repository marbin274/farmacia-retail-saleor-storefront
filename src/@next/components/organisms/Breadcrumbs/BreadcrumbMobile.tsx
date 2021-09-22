import classNames from 'classnames';
import React, { FC } from 'react';
import { BreadcrumbChildProps } from './types';
import * as S from './styles';
import { useClickedOutside } from '@temp/@next/hooks';
import {
  ArrowLeftIcon,
  DownIcon,
  NextIcon,
} from '@farmacia-retail/farmauna-components';

type IProps = BreadcrumbChildProps & {
  onClickOpen?: () => void;
  onClickClose?: () => void;
};

export const BreadcrumbMobile: FC<IProps> = ({
  baseLabel,
  baseUrl,
  breadcrumbsLength,
  breadcrumbs,
  onClickNav,
  onClickOpen,
  onClickClose,
}) => {
  const [isOpenBreadcrumb, setOpenBreadcrumb] = React.useState(false);
  const { clickedOutside, setElementRef } = useClickedOutside();

  React.useEffect(() => {
    if (clickedOutside) setOpenBreadcrumb(false);
  }, [clickedOutside]);

  React.useEffect(() => {
    if (isOpenBreadcrumb) {
      if (onClickOpen) onClickOpen();
    } else {
      if (onClickClose) onClickClose();
    }
  }, [isOpenBreadcrumb]);

  const onClickOpenBreadcrumb = () => {
    setOpenBreadcrumb(!isOpenBreadcrumb);
  };

  const onClickNavBreadcrumb = (path: string, isLast = false) => {
    if (isLast) return;
    onClickNav(path);
    setOpenBreadcrumb(false);
  };

  const renderHeadBreadcrumb = () => (
    <div
      className={classNames('fa-flex fa-items-center', {
        'fa-w-full': breadcrumbsLength === 1,
      })}
    >
      <span
        className="fa-bg-primary-medium fa-cursor-pointer fa-flex fa-h-8 fa-mr-2 fa-rounded-full fa-w-8"
        onClick={() => onClickNavBreadcrumb(baseUrl)}
      >
        <ArrowLeftIcon className="fa-m-auto fa-text-neutral-lightest" />
      </span>
      <S.BreadcrumbTitle
        oneItem={breadcrumbsLength === 1}
        className={classNames(
          'fa-cursor-pointer fa-font-medium fa-leading-4 fa-text-sm fa-truncate',
          {
            'fa-w-52': breadcrumbsLength > 1,
          }
        )}
      >
        {breadcrumbs[breadcrumbsLength - 1].label}
      </S.BreadcrumbTitle>
    </div>
  );

  const renderDownIcon = () => {
    if (breadcrumbsLength === 1) return <></>;
    return (
      <span
        role="breadcrumb-mobile-down"
        className={classNames(
          'fa-cursor-pointer fa-flex fa-h-8 fa-rounded-full fa-w-8',
          { 'fa-bg-neutral-light': isOpenBreadcrumb },
          { 'fa-bg-neutral-lightest': !isOpenBreadcrumb }
        )}
        onClick={onClickOpenBreadcrumb}
      >
        <DownIcon
          className={classNames(
            'fa-m-auto fa-text-neutral-darkest fa-transition-transform',
            {
              'fa-rotate-180 fa-transform': isOpenBreadcrumb,
            }
          )}
        />
      </span>
    );
  };

  const renderBreadcrumbList = () => {
    return breadcrumbs.map((breadcrumb, index) => (
      <li
        key={index}
        style={{
          marginLeft: `${index + 1}rem`,
        }}
        className={`fa-flex fa-items-center fa-mt-6`}
      >
        <NextIcon
          size={12}
          className={classNames(
            'fa-transform fa-translate-x-1 fa-translate-y-px',
            {
              'fa-text-highlight-medium': index === breadcrumbsLength - 1,
            }
          )}
        ></NextIcon>

        <span
          className={classNames(
            'fa-font-normal fa-leading-4 fa-ml-2 fa-overflow-ellipsis fa-overflow-hidden fa-text-sm',
            {
              'fa-cursor-pointer fa-text-neutral-darkest':
                index < breadcrumbsLength - 1,
              'fa-text-highlight-medium': index === breadcrumbsLength - 1,
            }
          )}
          onClick={() =>
            onClickNavBreadcrumb(
              breadcrumb.link,
              index === breadcrumbsLength - 1
            )
          }
        >
          {breadcrumb.label}
        </span>
      </li>
    ));
  };
  return (
    <div className="fa-relative fa-w-full" role="breadcrumbs-mobile">
      <div className="fa-w-full" ref={setElementRef()}>
        <div
          className={classNames(
            'fa-duration-400 fa-flex fa-items-center fa-justify-between fa-transition-colors fa-w-full fa-px-4 fa-py-3',
            { 'fa-bg-neutral-lightest': isOpenBreadcrumb }
          )}
        >
          {renderHeadBreadcrumb()}
          {renderDownIcon()}
        </div>
        <div
          className={classNames(
            'fa-absolute fa-bg-neutral-lightest fa-duration-200 fa-max-h-0 fa-overflow-hidden fa-rounded-b-2xl fa-top-14 fa-transition-height fa-w-full fa-z-2',
            {
              'fa-border-neutral-medium fa-border-solid fa-border-t fa-max-h-screen':
                isOpenBreadcrumb,
            }
          )}
        >
          <ul className="fa-px-5 fa-py-4">
            <>
              <li className="fa-flex fa-items-center">
                <NextIcon
                  size={12}
                  className={classNames(
                    'fa-transform fa-translate-x-1 fa-translate-y-px'
                  )}
                ></NextIcon>
                <span
                  className="fa-cursor-pointer fa-font-normal fa-leading-4 fa-ml-2 fa-overflow-ellipsis fa-overflow-hidden fa-text-neutral-darkest fa-text-sm"
                  onClick={() => onClickNavBreadcrumb(baseUrl)}
                >
                  {baseLabel}
                </span>
              </li>
              {renderBreadcrumbList()}
            </>
          </ul>
        </div>
      </div>
      <div
        className={classNames(
          'fa-absolute fa-bg-neutral-darkest fa-duration-300 fa-h-0 fa-opacity-0 fa-transition-opacity fa-w-full',
          { 'fa-opacity-70 fa-h-screen': isOpenBreadcrumb }
        )}
      />
    </div>
  );
};
