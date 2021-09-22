import React from 'react';
import Link from 'next/link';
import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from '@utils/core';
import * as S from './styles';
import { IProps } from './types';

const getLinkUrl = ({ category, collection, page }: IProps['item']) => {
  if (category) {
    return generateCategoryUrl(category.id, category.name);
  }
  if (collection) {
    return generateCollectionUrl(collection.id, collection.name);
  }
  if (page) {
    return generatePageUrl(page.slug);
  }
};

export const NavLink: React.FC<IProps> = ({
  item,
  fullWidth = false,
  children,
  ...props
}) => {
  const { name, url, category, collection, page } = item;

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  }

  const linkUrl = getLinkUrl({ category, collection, page });

  return linkUrl ? (
    <Link href={linkUrl}>
      <S.Link className="navlink-active" fullWidth={fullWidth} {...props}>
        {children ? <>{children}</> : name}
      </S.Link>
    </Link>
  ) : null;
};
