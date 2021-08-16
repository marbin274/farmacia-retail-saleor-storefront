import { BackIcon } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import { NavLink } from '@temp/@next/components/atoms';
import { MainMenuSubItem } from '@temp/components/MainMenu/gqlTypes//MainMenuSubItem';
import {
  convertCategoryToMenuItem,
  generateCategoryUrl,
} from '@temp/core/utils';
import {
  SimpleCategory_ancestors_edges_node,
  SimpleCategory_ancestors_edges_node_children_edges,
} from '@sdk/fragments/gqlTypes/SimpleCategory';
import React from 'react';

import * as S from './styles';
import { IProps } from './types';

export const CategoryNavigation: React.FC<IProps> = ({ category }) => {
  const ancestorNode: SimpleCategory_ancestors_edges_node | null = category
    .ancestors?.edges?.length
    ? category.ancestors.edges.slice(-1).pop()?.node || null
    : null;

  const hasChildren: boolean = !!category.children?.edges?.length;

  const edges:
    | SimpleCategory_ancestors_edges_node_children_edges[]
    | undefined = !hasChildren
    ? ancestorNode?.children?.edges
    : category.children?.edges;

  const getListElement = (id: string, name: string) => {
    const item: MainMenuSubItem = convertCategoryToMenuItem(id, name);
    const isActive =
      window.location.pathname === generateCategoryUrl(item.id, item.name);
    return (
      <S.Link key={item.id}>
        <S.NavLink item={item} isActive={isActive} />
      </S.Link>
    );
  };
  const isLvl1 = !category.ancestors?.edges.length;

  return (
    <S.Wrapper>
      <S.Title>
        {!isLvl1 && (
          <span className="fa-flex fa-items-center fa-mr-2 fa-mt-1">
            <NavLink
              fullWidth
              item={convertCategoryToMenuItem(
                ancestorNode?.id || '',
                ancestorNode?.name || ''
              )}
            >
              <BackIcon
                size={18}
                color={farmatheme.theme.colors.highlight.medium}
              />
            </NavLink>
          </span>
        )}
        <S.TitleName>
          {hasChildren ? category.name : ancestorNode?.name?.toLowerCase()}
        </S.TitleName>
      </S.Title>
      {edges?.map((subItem, index) => {
        const { id, name } = subItem.node;
        return <ul key={index}>{getListElement(id, name)}</ul>;
      })}
    </S.Wrapper>
  );
};
