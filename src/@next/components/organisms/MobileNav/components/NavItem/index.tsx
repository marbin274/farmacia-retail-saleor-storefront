import {
  DownIcon,
  NextIcon,
  UpIcon,
} from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import { MainMenuSubItem } from '@temp/@sdk/queries/gqlTypes/MainMenuSubItem';
import classNames from 'classnames';
import * as React from 'react';
import NavChildren from '../NavChildren';
import * as S from './styles';

export interface INavItem extends Omit<MainMenuSubItem, '__typename'> {
  children?: INavItem[] | null;
}

interface NavItemProps extends INavItem {
  arrowDirection?: arrowDirection;
  isCollection?: boolean;
  isOpen: boolean;
  firstLevel?: boolean;
  hideOverlay(): void;
  showSubItems(itemName: INavItem, isOpen: boolean): void;
}

type arrowDirection = 'rigth' | 'down';

export const NavItem: React.FC<NavItemProps> = ({
  arrowDirection = 'down',
  firstLevel = false,
  hideOverlay,
  isCollection = false,
  isOpen,
  showSubItems,
  ...item
}) => {
  const [isOpenMenu, setOpenMenu] = React.useState(isOpen);
  const childrens: INavItem[] = item?.children || [];
  const hasSubNavigation: boolean = !!childrens.length;

  function openHideMenu(isOpen: boolean) {
    setOpenMenu(!isOpen);
    showSubItems(item, isOpenMenu);
  }

  return (
    <S.NavMenuItem className="fa-flex fa-flex-col fa-cursor-pointer">
      <div className="hover:fa-bg-white fa-flex fa-justify-between fa-items-center fa-py-5 fa-px-6 fa-transition-all fa-duration-100 fa-ease-in-out">
        <S.NavLink
          isCollection={isCollection}
          item={{ ...item, name: item.name?.toLowerCase() } as any}
          className={classNames({
            'fa-text-neutral-darkest fa-capitalize': isOpenMenu,
          })}
        />
        {hasSubNavigation && (
          <div
            className={classNames({
              'fa-top-0': isOpenMenu,
            })}
          >
            {firstLevel && (
              <NextIcon
                size={16}
                onClick={() => openHideMenu(isOpenMenu)}
                color={farmatheme.theme.colors.highlight.medium}
              />
            )}
            {!firstLevel &&
              (isOpenMenu ? (
                <DownIcon
                  size={16}
                  onClick={() => openHideMenu(isOpenMenu)}
                  color={farmatheme.theme.colors.highlight.medium}
                />
              ) : (
                <UpIcon
                  size={16}
                  onClick={() => openHideMenu(isOpenMenu)}
                  color={farmatheme.theme.colors.highlight.medium}
                />
              ))}
          </div>
        )}
      </div>
      {isOpenMenu && hasSubNavigation && <NavChildren subItems={childrens} />}
    </S.NavMenuItem>
  );
};

export default NavItem;
