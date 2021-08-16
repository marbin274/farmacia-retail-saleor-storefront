import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>Mi cuenta</S.MenuHeader>
      {links.map(({ label, url }) => (
        <Link to={url} key={url} data-testid="account_menu__link">
          <S.MenuItem active={active === url}>{label}</S.MenuItem>
        </Link>
      ))}
    </S.Wrapper>
  );
};
