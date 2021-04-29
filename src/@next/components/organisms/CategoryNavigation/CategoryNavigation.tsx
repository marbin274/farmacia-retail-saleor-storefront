import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const CategoryNavigation: React.FC<IProps> = ({ subItems }) => {
  return (
    <S.Wrapper>
      <S.Title>Categorías</S.Title>
      <ul>
        {subItems.map(subItem => (
          <S.Link key={subItem.id}>
            <S.NavLink item={subItem} />
          </S.Link>
        ))}
      </ul>
    </S.Wrapper>
  );
};
