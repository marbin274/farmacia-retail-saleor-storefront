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
import * as S from "./styles";

interface NavListProps {
  categories: INavItem[];
  collections: INavItem[];
  hideOverlay(): void;
  openParent: INavItem | null;
  setOpenParent(item: INavItem): void;
}

export const NavList: React.FC<NavListProps> = ({
  categories,
  collections,
  hideOverlay,
  openParent,
  setOpenParent,
}) => {
  const handleShowSubItems = (itemName: INavItem) => {
    setOpenParent(itemName);
  };

  const handleClearOpenParent = () => {
    setOpenParent(null);
  };

  const getNavItem = (item: INavItem, isCollection = false) => {
    return <NavItem
      arrowDirection="rigth"
      firstLevel={true}
      hideOverlay={hideOverlay}
      isCollection={isCollection}
      isOpen={openParent?.name === item.name}
      key={item.id}
      showSubItems={handleShowSubItems}
      {...item}
    />
  }

  return (
    <>
      <ul>
        <S.NavMenuHeader>
          <Button
            onClick={hideOverlay}
            iconOnly
            icon={<IconHamburger open={true} />}
          />
          <Link className="fa-mx-auto" to={baseUrl} onClick={hideOverlay}>
            <ReactSVG path={logoImg} />
          </Link>
        </S.NavMenuHeader>
        {!openParent ? (
          <>
            <li>
              <S.CollectionNav>                
                {collections.map(item => getNavItem(item, true))}
              </S.CollectionNav>
            </li>
            <li>
              <ul className="fa-bg-highlight-lightest">
                <S.CategoriesLabel>Categorías</S.CategoriesLabel>
                {categories.map(item => getNavItem(item))}
              </ul>
            </li>
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
