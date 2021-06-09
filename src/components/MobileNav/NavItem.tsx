import { convertCategoryToMenuItem } from "@temp/core/utils";
import { MainMenuSubItem } from "@temp/views/Category/gqlTypes/MainMenuSubItem";
import classNames from "classnames";
import * as React from "react";
import ReactSVG from "react-svg";
import { NavLink } from "..";
import arrowDownImg from "../../images/arrow-down.svg";
import arrowRightImg from "../../images/arrow-right.svg";
import NavChildren from "./NavChildren";

export interface INavItem extends Omit<MainMenuSubItem, '__typename'> {
  children?: INavItem[] | null;
}

interface NavItemProps extends INavItem {
  arrowDirection?: arrowDirection;
  isOpen: boolean;
  hideOverlay(): void;
  showSubItems(itemName: INavItem, isOpen: boolean): void;
}

type arrowDirection = "rigth" | "down";

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  arrowDirection = "down",
  isOpen,
  ...item
}) => {
  const [isOpenMenu, setOpenMenu] = React.useState(isOpen);
  const childrens: INavItem[] = item?.children || [];
  const hasSubNavigation: boolean = !!childrens.length;

  function openHideMenu(isOpen: boolean) {
    setOpenMenu(!isOpen)
    showSubItems(item, isOpenMenu)
  }

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
        "side-nav__menu-item--is-open": isOpenMenu,
      })}
    >
      <div className={"side-nav__menu-item-content"}>
        <NavLink
          item={convertCategoryToMenuItem(item.id, item.name?.toLowerCase())}
          className={"side-nav__menu-item-link"}
        />
        {hasSubNavigation && (
          <ReactSVG
            className={"side-nav__menu-item-arrow"}
            path={arrowDirection === "down" ? arrowDownImg : arrowRightImg}
            onClick={() => openHideMenu(isOpenMenu)}
          />
        )}
      </div>
      {isOpenMenu && hasSubNavigation && <NavChildren subItems={childrens} />}
    </li>
  );
};

export default NavItem;
