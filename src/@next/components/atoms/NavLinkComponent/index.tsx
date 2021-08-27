import {
  FooterSecondaryMenu_shop_navigation_secondary_items,
  FooterSecondaryMenu_shop_navigation_secondary_items_children,
} from '@sdk/queries/gqlTypes/FooterSecondaryMenu';
import { MainMenu_shop_navigation_main_items } from '@sdk/queries/gqlTypes/MainMenu';
import { MainMenuSubItem } from '@sdk/queries/gqlTypes/MainMenuSubItem';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from '@temp/core/utils';
import * as S from './styles';

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
    const isActive = window?.location.pathname === url;
    return (
      <Link to={url} {...props}>
        <S.NavActive isActive={isActive}>{name} </S.NavActive>
      </Link>
    );
  };

  if (url) {
    if (name === 'Libro de reclamaciones' || name === 'Derechos ARCO') {
      if (name === 'Libro de reclamaciones') {
        return (
          <a
            href="https://wcentrix.net/app/form_web.html?accountID=Fa6578&wcboxID=456c31fd61444d7dad4f8c0abe1ba9d7"
            target="_blank"
            {...props}
            rel="noopener nofollow"
          >
            {name}
          </a>
        );
      }
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
