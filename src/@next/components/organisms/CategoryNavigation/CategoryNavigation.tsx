import React from "react";
import { NavLink } from "@temp/components/NavLink";
import * as S from "./styles";
import { IProps } from "./types";

export const CategoryNavigation: React.FC<IProps> = ({ subItems }) => {
  return (
    <S.Wrapper>
      <S.Title>Categorías</S.Title>
      <S.List>
        {subItems.map(subItem => (
          <S.Link key={subItem.id}>
            <NavLink item={subItem} className="category__link" />
          </S.Link>
        ))}
      </S.List>
    </S.Wrapper>
  );
};
