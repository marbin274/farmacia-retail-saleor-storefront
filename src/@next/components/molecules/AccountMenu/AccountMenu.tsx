import React from 'react';
import Link from 'next/link';
import * as S from './styles';
import { IProps } from './types';

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>Mi cuenta</S.MenuHeader>
      {links.map(({ label, url }) => (
        <Link href={url} key={url}>
          <S.MenuItem data-testid="account_menu__link" active={active === url}>
            {label}
          </S.MenuItem>
        </Link>
      ))}
    </S.Wrapper>
  );
};
