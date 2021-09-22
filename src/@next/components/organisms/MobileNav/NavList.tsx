import { Button } from '@farmacia-retail/farmauna-components';
import { IconHamburger } from '@temp/@next/components/atoms';
import { baseUrl } from '@temp/app/routes';
import * as React from 'react';
import Link from 'next/link';
import { ReactSVG } from 'react-svg';
import NavItem, { INavItem } from './components/NavItem';
import { NavSubItem } from './components/NavSubItem';
import * as S from './styles';

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

  const getNavItem = (item: INavItem, isCollection?: boolean) => {
    return (
      <NavItem
        arrowDirection="rigth"
        firstLevel
        hideOverlay={hideOverlay}
        isCollection={isCollection}
        isOpen={openParent?.name === item.name}
        key={item.id}
        showSubItems={handleShowSubItems}
        {...item}
      />
    );
  };

  return (
    <>
      <ul>
        <S.NavMenuHeader>
          <Button
            onClick={hideOverlay}
            iconOnly
            icon={<IconHamburger open />}
          />
          <Link href={baseUrl}>
            <ReactSVG
              className="fa-mx-auto"
              src="/assets/logo.svg"
              onClick={hideOverlay}
            />
          </Link>
        </S.NavMenuHeader>
        {!openParent ? (
          <>
            <li>
              <S.CollectionNav>
                {collections.map((item) => getNavItem(item, true))}
              </S.CollectionNav>
            </li>
            <li>
              <ul className="fa-bg-highlight-lightest">
                <S.CategoriesLabel>Categorías</S.CategoriesLabel>
                {categories.map((item) => getNavItem(item))}
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
