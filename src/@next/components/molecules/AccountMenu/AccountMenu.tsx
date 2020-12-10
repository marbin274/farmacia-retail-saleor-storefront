import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenu: React.FC<IProps> = ({ links, active }: IProps) => {
  return (
    <S.Wrapper>
      <S.MenuHeader>Mi Cuenta</S.MenuHeader>
      {links.map(link => {
        return (
          <Link to={link.url} key={link.url} data-testid="account_menu__link">
            <S.MenuItem active={active === link}>{link.label}</S.MenuItem>
          </Link>
        );
      })}
    </S.Wrapper>
  );
};
