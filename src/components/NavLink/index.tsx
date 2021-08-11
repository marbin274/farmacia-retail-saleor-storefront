import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "../../core/utils";
import {
  SecondaryMenu_shop_navigation_secondary_items,
  SecondaryMenu_shop_navigation_secondary_items_children,
} from "../Footer/gqlTypes/SecondaryMenu";
import { MainMenu_shop_navigation_main_items } from "@temp/components/MainMenu/gqlTypes/MainMenu";
import { MainMenuSubItem } from "@temp/components/MainMenu/gqlTypes/MainMenuSubItem";
import * as S from "./styles";

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | SecondaryMenu_shop_navigation_secondary_items
    | SecondaryMenu_shop_navigation_secondary_items_children;
}
const NavLinkComponent: React.FC<NavLinkProps & RouteComponentProps> = ({
  item,
  match,
  ...props
}) => {
  const { name, url, category, collection, page } = item;
  const link = (url: string) => {
    const isActive = window.location.pathname === url;
    return (
      <Link to={url} {...props}>
        <S.NavActive isActive={isActive}>{name} </S.NavActive>
      </Link>
    );
  };

  if (url) {
    if (name === "Libro de reclamaciones" || name === "Derechos ARCO") {
      return (
        <a href={url} target="_blank" {...props} rel="noopener nofollow">
          {name}
        </a>
      );
    }

    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  } else if (category) {
    return link(generateCategoryUrl(category.id, category.name));
  } else if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  } else if (page) {
    return link(generatePageUrl(page.slug));
  }

  return <span {...props}>{name}</span>;
};

export const NavLink = withRouter(NavLinkComponent);
