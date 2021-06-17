import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { baseUrl } from "../../app/routes";
import logoImg from "../../images/logo.svg";
import NavItem, { INavItem } from "./NavItem";
import { NavSubItem } from "./NavSubItem";
import "./scss/index.scss";
import { IconHamburger } from "@temp/@next/components/atoms";
import { Button } from "@farmacia-retail/farmauna-components";

interface NavListProps {
  openParent: INavItem | null;
  items: INavItem[];
  hideOverlay(): void;
  setOpenParent(item: INavItem): void;
}

export const NavList: React.FC<NavListProps> = ({
  items,
  openParent,
  hideOverlay,
  setOpenParent,
}) => {
  const handleShowSubItems = (itemName: INavItem) => {
    setOpenParent(itemName);
  };

  const handleClearOpenParent = () => {
    setOpenParent(null);
  };

  return (
    <>
      <ul className="fa-bg-highlight-lightest">
        <li className="side-nav__menu-item-header">
          <Button
            onClick={hideOverlay}
            iconOnly
            icon={<IconHamburger open={true} />}
          />
          <Link className="fa-mx-auto" to={baseUrl} onClick={hideOverlay}>
            <ReactSVG path={logoImg} />
          </Link>
        </li>
        {!openParent ? (
          <>
            {items.map(item => (
              <NavItem
                key={item.id}
                firstLevel={true}
                hideOverlay={hideOverlay}
                showSubItems={handleShowSubItems}
                isOpen={openParent?.name === item.name}
                arrowDirection="rigth"
                {...item}
              />
            ))}
          </>
        ) : (
          <>
            <NavSubItem
              hideOverlay={hideOverlay}
              returnMain={handleClearOpenParent}
              {...openParent}
            />
          </>
        )}
      </ul>
    </>
  );
};

export default NavList;
