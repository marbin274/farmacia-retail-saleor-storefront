import { useMediaScreen } from '@temp/@next/globalStyles';
import { TypedMainMenuQuery } from '@temp/components/MainMenu/queries';
import { convertCategoryToMenuItem, maybe } from '@temp/core/utils';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header as HeaderComponent, INavItem, MainMenu } from '../components';
import '../globalStyles/scss/index.scss';

export const Header: React.FC = () => {
  const location = useLocation();
  const { isMobileScreen } = useMediaScreen();

  const hideMenuCondition =
    location.pathname.includes('checkout') ||
    location.pathname.includes('order-finalized');

  const hideMenuConditionMobile =
    isMobileScreen &&
    (location.pathname.includes('select-categories') ||
      location.pathname.includes('payment-methods') ||
      location.pathname.includes('account') ||
      location.pathname.includes('address-book') ||
      location.pathname.includes('order-history'));

  const isLightHeader =
    location.pathname.includes('select-categories') ||
    location.pathname.includes('payment-methods') ||
    location.pathname.includes('account') ||
    location.pathname.includes('address-book') ||
    location.pathname.includes('order-history') ||
    location.pathname.includes('product') ||
    location.pathname.includes('search') ||
    location.pathname.includes('category') ||
    location.pathname.includes('collection');

  return (
    <TypedMainMenuQuery alwaysRender renderOnError displayLoader={false}>
      {({ data }) => {
        const categories: INavItem[] = maybe(
          () =>
            data.root_categories.edges.map(
              (lvl1): INavItem => ({
                ...convertCategoryToMenuItem(lvl1.node.id, lvl1.node.name),
                children: lvl1.node.children.edges.map((lvl2) => ({
                  ...convertCategoryToMenuItem(lvl2.node.id, lvl2.node.name),
                  children: lvl2.node.children.edges.map((lvl3) =>
                    convertCategoryToMenuItem(lvl3.node.id, lvl3.node.name)
                  ),
                })),
              })
            ),
          []
        );
        const collections: INavItem[] = maybe(
          () =>
            data.shop.navigation?.main?.items.filter((it) => !!it.collection),
          []
        );

        const navMain: INavItem[] = maybe(
          () => data.shop.navigation?.main?.items,
          []
        );

        return (
          <>
            <HeaderComponent
              categories={categories}
              collections={collections}
              hideMenuCondition={hideMenuCondition}
              isLightHeader={isLightHeader}
            />
            <MainMenu
              categories={categories}
              hideMenuConditionMobile={hideMenuConditionMobile}
              hideMenuCondition={hideMenuCondition}
              navMain={navMain}
              isLightHeader={isLightHeader}
            />
          </>
        );
      }}
    </TypedMainMenuQuery>
  );
};
