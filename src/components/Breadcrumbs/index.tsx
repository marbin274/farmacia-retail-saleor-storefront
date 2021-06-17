import { smallScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";
import Media from "react-media";
import { Link } from "react-router-dom";

import { baseUrl } from "../../app/routes";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/gqlTypes/Category";
import { HomeIcon, NextIcon } from "@farmacia-retail/farmauna-components";

export interface Breadcrumb {
  value: string;
  link: string;
}

type IBreadcrumbProps = {
  breadcrumbs: Breadcrumb[];
  breadcrumbsAlwaysVisible?: boolean;
  className?: string;
  showHomeIcon?: boolean;
  backLabelMobile?: string;
};

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const getBackLink = (breadcrumbs: Breadcrumb[]) =>
  breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].link : "/";

const Breadcrumbs: React.FC<IBreadcrumbProps> = ({
  breadcrumbs,
  breadcrumbsAlwaysVisible,
  className,
  showHomeIcon,
  backLabelMobile,
}) => (
  <Media
    query={{
      minWidth: smallScreen,
    }}
  >
    {matches =>
      breadcrumbsAlwaysVisible || matches ? (
        <ul className={classNames("breadcrumbs", className)}>
          <li>
            <Link to={baseUrl}>
              {showHomeIcon && (
                <HomeIcon size={20} className="breadcrumbs__home-icon" />
              )}
              <span className="breadcrumbs__home_title">Inicio</span>
            </Link>
            <NextIcon size={10} className="breadcrumbs__next-icon" />
          </li>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.value}
              className={classNames({
                breadcrumbs__active: index === breadcrumbs.length - 1,
              })}
            >
              <Link to={breadcrumb.link}>
                {breadcrumb.value?.toLocaleLowerCase()}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <NextIcon size={10} className="breadcrumbs__next-icon" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="breadcrumbs">
          <Link to={getBackLink(breadcrumbs)}>
            {backLabelMobile || "Atrás"}
          </Link>
        </div>
      )
    }
  </Media>
);

export default Breadcrumbs;
