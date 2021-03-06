import {
  FooterSecondaryMenu_shop_navigation_secondary_items,
  FooterSecondaryMenu_shop_navigation_secondary_items_children,
} from '@sdk/queries/gqlTypes/FooterSecondaryMenu';
import { MainMenu_shop_navigation_main_items } from '@sdk/queries/gqlTypes/MainMenu';
import { MainMenuSubItem } from '@sdk/queries/gqlTypes/MainMenuSubItem';
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from '@temp/core/utils';
import * as React from 'react';
import Link from 'next/link';
import * as S from './styles';

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_shop_navigation_main_items
    | MainMenuSubItem
    | FooterSecondaryMenu_shop_navigation_secondary_items
    | FooterSecondaryMenu_shop_navigation_secondary_items_children;
}
const NavLinkComponent: React.FC<NavLinkProps> = ({ item, ...props }) => {
  const { name, url, category, collection, page } = item;
  const link = (url: string) => {
    const isActive = window?.location.pathname === url;
    return (
      <Link href={url}>
        <S.NavActive isActive={isActive} {...props}>
          {name}
        </S.NavActive>
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

export const NavLink = NavLinkComponent;
