import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from '../../core/utils';
import { MainMenu_shop_navigation_main_items } from '@temp/components/MainMenu/gqlTypes/MainMenu';
import { MainMenuSubItem } from '@temp/components/MainMenu/gqlTypes/MainMenuSubItem';
import * as S from './styles';
import {
  FooterSecondaryMenu_shop_navigation_secondary_items,
  FooterSecondaryMenu_shop_navigation_secondary_items_children,
} from '@sdk/queries/gqlTypes/FooterSecondaryMenu';

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | FooterSecondaryMenu_shop_navigation_secondary_items
    | FooterSecondaryMenu_shop_navigation_secondary_items_children;
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
    if (name === 'Libro de reclamaciones' || name === 'Derechos ARCO') {
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
