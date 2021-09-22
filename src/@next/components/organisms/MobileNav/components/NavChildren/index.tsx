import { convertCategoryToMenuItem } from '@temp/core/utils';
import * as React from 'react';
import { NavLink } from '@components/atoms/NavLinkComponent';
import { INavItem } from '../NavItem';
import * as S from './styles';

interface NavChildrenProps {
  subItems: INavItem[];
  hideOverlay: () => void;
}

const NavChildren: React.FC<NavChildrenProps> = ({ subItems, hideOverlay }) => (
  <S.NavChildrenWrapper className="fa-py-4 fa-px-3 fa-bg-white">
    {subItems.map((subItem) => (
      <NavLink
        key={subItem.id}
        onClick={hideOverlay}
        item={convertCategoryToMenuItem(subItem.id, subItem.name)}
        className="fa-flex fa-flex-col fa-p-4 fa-rounded-lg fa-text-sm fa-ml-5 child"
      />
    ))}
  </S.NavChildrenWrapper>
);

export default NavChildren;
