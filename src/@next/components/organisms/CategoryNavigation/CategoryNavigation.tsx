import { Icon, NavLink } from "@temp/@next/components/atoms";
import { MainMenuSubItem } from "@temp/components/MainMenu/gqlTypes//MainMenuSubItem";
import { convertCategoryToMenuItem } from "@temp/core/utils";
import { SimpleCategory_ancestors_edges_node, SimpleCategory_ancestors_edges_node_children_edges } from "@temp/views/Category/gqlTypes/SimpleCategory";
import React from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const CategoryNavigation: React.FC<IProps> = ({ category }) => {
  const ancestorNode: SimpleCategory_ancestors_edges_node | null =
    category.ancestors?.edges?.length ?
      (category.ancestors.edges.slice(-1).pop()?.node || null)
      : null;

  const hasChildren: boolean = !!category.children?.edges?.length;

  const edges: SimpleCategory_ancestors_edges_node_children_edges[] | undefined = !hasChildren ? ancestorNode?.children?.edges : category.children?.edges;

  const getListElement = (id: string, name: string) => {
    const item: MainMenuSubItem = convertCategoryToMenuItem(id, name);

    return (
    <S.Link key={item.id}>
      <S.NavLink item={item} />
    </S.Link>
    )
  }
  const isLvl1 = !category.ancestors?.edges.length;
  
  
  return (
    <S.Wrapper>
      <S.Title>
        {
          !isLvl1 &&
          <S.TitleIcon>
            <NavLink
              fullWidth
              item={convertCategoryToMenuItem(ancestorNode?.id || '', ancestorNode?.name || '')}
            >
              <Icon name="arrow_left" size={18} viewPort={24} />
            </NavLink>
          </S.TitleIcon>
        }
        <S.TitleName isLvl1={isLvl1}>{hasChildren ? category.name: ancestorNode?.name?.toLowerCase()}</S.TitleName>
      </S.Title>
      <hr />
      {edges?.map((subItem, index) => {
        const { id, name } = subItem.node;
        return (
          <ul key={index}>
            {getListElement(id, name)}
          </ul>
        )
      })}
    </S.Wrapper>
  );
};
