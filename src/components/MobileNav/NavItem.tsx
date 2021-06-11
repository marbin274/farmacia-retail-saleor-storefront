import { convertCategoryToMenuItem } from "@temp/core/utils";
import { MainMenuSubItem } from "@temp/views/Category/gqlTypes/MainMenuSubItem";
import classNames from "classnames";
import * as React from "react";
import { NavLink } from "..";
import NavChildren from "./NavChildren";
import { NextIcon, DownIcon, UpIcon } from "@farmacia-retail/farmauna-components";
import farmatheme from "@farmatheme";

export interface INavItem extends Omit<MainMenuSubItem, "__typename"> {
  children?: INavItem[] | null;
}

interface NavItemProps extends INavItem {
  arrowDirection?: arrowDirection;
  isOpen: boolean;
  firstLevel?: boolean;
  hideOverlay(): void;
  showSubItems(itemName: INavItem, isOpen: boolean): void;
}

type arrowDirection = "rigth" | "down";

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  arrowDirection = "down",
  isOpen,
  firstLevel = false,
  ...item
}) => {
  const [isOpenMenu, setOpenMenu] = React.useState(isOpen);
  const childrens: INavItem[] = item?.children || [];
  const hasSubNavigation: boolean = !!childrens.length;

  function openHideMenu(isOpen: boolean) {
    setOpenMenu(!isOpen);
    showSubItems(item, isOpenMenu);
  }

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
        "side-nav__menu-item--is-open": isOpenMenu,
      })}
    >
      <div className={"hover:fa-bg-white side-nav__menu-item-content"}>
        <NavLink
          item={convertCategoryToMenuItem(item.id, item.name?.toLowerCase())}
          className={"side-nav__menu-item-link"}
        />
        {hasSubNavigation && (
          <div className={"side-nav__menu-item-arrow"}>
            {firstLevel && (
              <NextIcon size={16} onClick={() => openHideMenu(isOpenMenu)} color={farmatheme.theme.colors.highlight.medium} />
            )}
            {!firstLevel &&
              (isOpenMenu ? (
                <DownIcon size={16} onClick={() => openHideMenu(isOpenMenu)} color={farmatheme.theme.colors.highlight.medium} />
              ) : (
                <UpIcon size={16} onClick={() => openHideMenu(isOpenMenu)} color={farmatheme.theme.colors.highlight.medium} />
              ))}
          </div>
        )}
      </div>
      {isOpenMenu && hasSubNavigation && <NavChildren subItems={childrens} />}
    </li>
  );
};

export default NavItem;
