import * as React from "react";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { baseUrl } from "../../app/routes";
import closeImg from "../../images/close-circle.svg";
import logoImg from "../../images/logo.svg";
import NavItem, { INavItem } from "./NavItem";
import { NavSubItem } from "./NavSubItem";
import "./scss/index.scss";

interface NavListProps {
  openParent: INavItem | null;
  items: INavItem[];
  hideOverlay(): void;
  setOpenParent(item: INavItem): void;
}

export const NavList: React.FC<NavListProps> = ({ items, openParent, hideOverlay, setOpenParent }) => {
  


  const handleShowSubItems = (itemName: INavItem) => {
    setOpenParent(itemName);
  };

  const handleClearOpenParent = () => {
    setOpenParent(null);
  }


  return (
    <>
      <ul>
        {
          !openParent ? <>
            <li className="side-nav__menu-item-header">
              <Link to={baseUrl} onClick={hideOverlay}>
                <ReactSVG path={logoImg} />
              </Link>
              <ReactSVG
                path={closeImg}
                className="side-nav__menu-item-close"
                onClick={hideOverlay}
              />
            </li>
            <li className="side-nav__menu-item--static">Categorías</li>
            {items.map((item) => (
              <NavItem
                key={item.id}
                hideOverlay={hideOverlay}
                showSubItems={handleShowSubItems}
                isOpen={openParent?.name === item.name}
                arrowDirection="rigth"
                {...item}
              />
            ))}
          </>
            : <NavSubItem
              hideOverlay={hideOverlay}
              returnMain={handleClearOpenParent}
              {...openParent} />
        }
      </ul>      
    </>
  );

}

export default NavList;
