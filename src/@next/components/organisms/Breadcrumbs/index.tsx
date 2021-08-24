import { HomeIcon, NextIcon } from '@farmacia-retail/farmauna-components';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { smallScreen } from '@temp/@next/globalStyles/constants';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '@temp/app/routes';
import { getDBIdFromGraphqlId, slugify } from '@temp/core/utils';
import { CategoryDetails_category } from '@sdk/queries/gqlTypes/CategoryDetails';
import * as S from './styles';
export interface Breadcrumb {
  label: string;
  link: string;
}

type IBreadcrumbProps = {
  breadcrumbs: Breadcrumb[];
  breadcrumbsAlwaysVisible?: boolean;
  className?: string;
  showHomeIcon?: boolean;
  backLabelMobile?: string;
};

export const extractBreadcrumbs = (category: CategoryDetails_category) => {
  const constructLink = (item) => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, 'Category')}/`,
    ].join(''),
    label: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map((edge) =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : '/';

export const Breadcrumbs: React.FC<IBreadcrumbProps> = ({
  breadcrumbs,
  breadcrumbsAlwaysVisible,
  className,
  showHomeIcon,
  backLabelMobile,
}) => {
  const { isCustomMinScreen: isMinSmallScreen } = useMediaScreen(
    smallScreen.toString()
  );

  const renderNextIcon = () => {
    return (
      <NextIcon
        size={10}
        className="fa-inline-block fa-mt-1 fa-mb-1 fa-mx-3 fa-align-middle"
      />
    );
  };

  if (breadcrumbsAlwaysVisible || isMinSmallScreen) {
    return (
      <ul
        className={classNames(
          'fa-inline-flex fa-flex-wrap fa-mt-4 fa-mb-8 fa-mx-0 sm:fa-mb-4',
          className
        )}
      >
        <S.ListItem>
          <Link to={baseUrl}>
            {showHomeIcon && (
              <HomeIcon
                size={20}
                className="fa-inline-block fa-align-middle fa-my-0 fa-mr-0 fa-ml-2 sm:fa-m-0"
              />
            )}
          </Link>
          {renderNextIcon()}
        </S.ListItem>
        {breadcrumbs.map((breadcrumb, index) => (
          <S.ListItem active={index === breadcrumbs.length - 1} key={index}>
            <Link to={breadcrumb.link}>
              {breadcrumb.label?.toLocaleLowerCase()}
            </Link>
            {index < breadcrumbs.length - 1 && renderNextIcon()}
          </S.ListItem>
        ))}
      </ul>
    );
  }

  return (
    <div className="fa-inline-flex fa-flex-wrap fa-mt-4 fa-mb-8 fa-mx-0 sm:fa-mb-4">
      <S.LinkMobile to={getBackLink(breadcrumbs)}>
        {backLabelMobile || 'Atrás'}
      </S.LinkMobile>
    </div>
  );
};
