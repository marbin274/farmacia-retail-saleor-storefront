import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const CategoryNavigation: React.FC<IProps> = ({ categories }) => {
  return (
    <S.Wrapper>
      <S.Title>Categorías</S.Title>
      <S.List>
        {categories.map(({ node }) => {
          return <S.Link key={node.id}>{node.name}</S.Link>;
        })}
      </S.List>
    </S.Wrapper>
  );
};
