import { MainMenuSubItem } from "@temp/components/MainMenu/gqlTypes/MainMenuSubItem";
import { convertCategoryToMenuItem } from "@temp/core/utils";
import { SimpleCategory_ancestors_edges, SimpleCategory_ancestors_edges_node_children_edges } from "@temp/views/Category/gqlTypes/SimpleCategory";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const CategoryNavigation: React.FC<IProps> = ({ category }) => {
  const ancestors: SimpleCategory_ancestors_edges[] = category.ancestors?.edges || [];

  const edges: SimpleCategory_ancestors_edges_node_children_edges[] | undefined = ancestors[0] ? ancestors[0].node.children?.edges : category.children?.edges;

  const getListElement = (id: string, name: string, level: number) => {
    const item: MainMenuSubItem = convertCategoryToMenuItem(id, name);

    return (
    <S.Link key={item.id}>
      <S.NavLink item={item} />
    </S.Link>
    )
  }

  return (
    <S.Wrapper>
      <S.Title>Categorías</S.Title>
      {edges?.map((subItem, index) => {
        const { id, name } = subItem.node;
        return (
          <ul key={index}>
            {getListElement(id, name, 1)}
            {
              // TODO: activate lvl 3 from subItem.node.children              
              // children &&
              // <ul>
              //   {children.edges.map(subItem => getListElement(subItem.node.id, subItem.node.name, 2))}
              // </ul>              
            }
          </ul>
        )
      })}
    </S.Wrapper>
  );
};
