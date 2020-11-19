import * as React from "react";
import { INavItem } from ".";

interface NavChildrenProps {
  subItems: INavItem[];
}

const NavChildren: React.FC<NavChildrenProps> = ({ subItems }) => {
  return (
    <ul className="side-nav__nav-children">
      {subItems.map(({ name }) => (
        <li key={name} className="side-nav__nav-children__child">
          {name}
        </li>
      ))}
    </ul>
  );
};

export default NavChildren;
