import { TypedMainMenuQuery } from "@temp/components/MainMenu/queries";
import { convertCategoryToMenuItem, maybe } from "@temp/core/utils";
import React from "react";
import { useLocation } from "react-router-dom";
import { Header as HeaderComponent, INavItem, MainMenu } from "../components";
import "../globalStyles/scss/index.scss";

export const Header: React.FC = () => {
  const location = useLocation();
  const hideMenuCondition =
    location.pathname.includes("checkout") ||
    location.pathname.includes("order-finalized");

  const isProductPage = 
    location.pathname.includes("product") || 
    location.pathname.includes("search");

  return (
    <TypedMainMenuQuery
      alwaysRender
      renderOnError
      displayLoader={false}
    >
      {({ data }) => {
        const categories: INavItem[] = maybe(
          () =>
            data.categories.edges.map(
              (lvl1): INavItem => ({
                ...convertCategoryToMenuItem(lvl1.node.id, lvl1.node.name),
                children: lvl1.node.children.edges.map(lvl2 => ({
                  ...convertCategoryToMenuItem(lvl2.node.id, lvl2.node.name),
                  children: lvl2.node.children.edges.map(lvl3 =>
                    convertCategoryToMenuItem(lvl3.node.id, lvl3.node.name)
                  ),
                })),
              })
            ),
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
              hideMenuCondition={hideMenuCondition}
              isProductPage={isProductPage}
            />
            <MainMenu
              categories={categories}
              hideMenuCondition={hideMenuCondition}
              navMain={navMain}
              isProductPage={isProductPage}
            />
          </>
        );
      }}
    </TypedMainMenuQuery>
  );
};