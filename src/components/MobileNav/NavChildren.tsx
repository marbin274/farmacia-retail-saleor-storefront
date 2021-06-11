import { convertCategoryToMenuItem } from "@temp/core/utils";
import * as React from "react";
import { NavLink } from "../NavLink";
import { INavItem } from "./NavItem";

interface NavChildrenProps {
  subItems: INavItem[];
}

const NavChildren: React.FC<NavChildrenProps> = ({ subItems }) => (
  <ul className="side-nav__nav-children">
    {subItems.map(subItem => (
      <NavLink
        key={subItem.id}
        item={convertCategoryToMenuItem(subItem.id, subItem.name)}
        className="side-nav__nav-children__child"
      />
    ))}
  </ul>
);

export default NavChildren;
