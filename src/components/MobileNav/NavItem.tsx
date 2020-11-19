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
  showSubItems(itemName: string): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  showSubItems,
  isOpen,
  ...item
}) => {
  const hasSubNavigation = item.children && !!item.children.length;

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
        "side-nav__menu-item--is-open": isOpen,
      })}
    >
      <div className={"side-nav__menu-item-content"}>
        <NavLink
          item={item}
          className={"side-nav__menu-item-link"}
          onClick={() => hasSubNavigation && showSubItems(item.name)}
        />
        {hasSubNavigation && (
          <ReactSVG
            className={"side-nav__menu-item-arrow"}
            path={arrowImg}
            onClick={() => showSubItems(item.name)}
          />
        )}
      </div>
      {isOpen && hasSubNavigation && <NavChildren subItems={item.children} />}
    </li>
  );
};

export default NavItem;
