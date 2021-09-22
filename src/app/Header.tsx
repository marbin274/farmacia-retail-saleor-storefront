import { INavItem } from '@components/organisms/MobileNav';
import { useMediaScreen } from '@temp/@next/globalStyles';
import { useMainMenu } from '@temp/@sdk/react';
import { convertCategoryToMenuItem, maybe } from '@temp/core/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const HeaderComponent = dynamic(() => import('@components/organisms/Header'), {
  ssr: false,
});
const MainMenu = dynamic(() => import('@components/organisms/MainMenu'), {
  ssr: false,
});

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const { isMobileScreen } = useMediaScreen();

  const { data } = useMainMenu();

  const hideMenuCondition =
    pathname.includes('checkout') || pathname.includes('order-finalized');

  const hideMenuConditionMobile =
    isMobileScreen &&
    (pathname.includes('select-categories') ||
      pathname.includes('payment-methods') ||
      pathname.includes('account') ||
      pathname.includes('address-book') ||
      pathname.includes('order-history'));

  const isLightHeader =
    pathname.includes('select-categories') ||
    pathname.includes('payment-methods') ||
    pathname.includes('account') ||
    pathname.includes('address-book') ||
    pathname.includes('order-history') ||
    pathname.includes('product') ||
    pathname.includes('search') ||
    pathname.includes('category') ||
    pathname.includes('collection');

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
    () => data.shop.navigation?.main?.items.filter((it) => !!it.collection),
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
};
