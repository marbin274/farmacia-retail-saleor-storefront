import * as React from "react";
import { INavItem } from ".";
import { NavLink } from "../NavLink";

interface NavChildrenProps {
  subItems: INavItem[];
}

const NavChildren: React.FC<NavChildrenProps> = ({ subItems }) => (
  <ul className="side-nav__nav-children">
    {subItems.map(subItem => (
      <NavLink
        key={subItem.id}
        item={subItem}
        className="side-nav__nav-children__child"
      />
    ))}
  </ul>
);

export default NavChildren;
