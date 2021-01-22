import classNames from "classnames";
import * as React from "react";
import ReactSVG from "react-svg";
import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";
import arrowImg from "../../images/arrow_down.svg";
import NavChildren from "./NavChildren";

export interface INavItem extends MainMenuSubItem {
  children?: INavItem[];
}

interface NavItemProps extends INavItem {
  isOpen: boolean;
  hideOverlay(): void;
  showSubItems(itemName: string, isOpen: boolean): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  isOpen,
  ...item
}) => {
  const [isOpenMenu, setOpenMenu] =  React.useState(isOpen)
  const hasSubNavigation = item.children && !!item.children.length;

  function openHideMenu(name: string, isOpen: boolean){
    setOpenMenu(!isOpen)
    showSubItems(item.name, isOpenMenu)
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
          item={item}
          className={"side-nav__menu-item-link"}
          onClick={() => hasSubNavigation && openHideMenu(name, isOpenMenu)}
        />
        {hasSubNavigation && (
          <ReactSVG
            className={"side-nav__menu-item-arrow"}
            path={arrowImg}
            onClick={() => openHideMenu(item.name, isOpenMenu)}
          />
        )}
      </div>
      {isOpenMenu && hasSubNavigation && <NavChildren subItems={item.children} />}
    </li>
  );
};

export default NavItem;
