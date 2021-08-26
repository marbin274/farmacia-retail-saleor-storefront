import { Button, NextIcon } from '@farmacia-retail/farmauna-components';
import farmatheme from '@farmatheme';
import { NavLink } from '@temp/@next/components/atoms';
import React from 'react';
import { INavItem } from '@components/organisms/MobileNav';
import * as S from './styles';

interface IProps {
  categories: INavItem[] | null;
  close: () => void;
}

export const OverlayNav: React.FC<IProps> = ({ categories, close }) => {
  const [itemLvl1Selected, setItemLvl1Selected] =
    React.useState<INavItem | null>(null);

  const getLink = React.useCallback((lvl: INavItem) => {
    return (
      <NavLink
        fullWidth
        item={{
          ...lvl,
          name: lvl.name?.toLowerCase(),
        }}
        onClick={close}
      />
    );
  }, []);

  return (
    <S.Wrapper>
      <S.Overlay
        className=""
        onMouseLeave={() => {
          setItemLvl1Selected(null);
        }}
      >
        <S.lvl1List>
          {categories.map((it) => (
            <li
              key={it.id}
              onMouseEnter={() => {
                setItemLvl1Selected(it);
              }}
            >
              <NavLink fullWidth item={it} onClick={close}>
                <span>{it.name?.toLowerCase()}</span>
                <NextIcon
                  color={farmatheme.theme.colors.highlight.medium}
                  size={18}
                />
              </NavLink>
            </li>
          ))}
        </S.lvl1List>
        {itemLvl1Selected && (
          <S.OverlayNavItems>
            <S.OverlayNavItemTitle>
              <h4>{itemLvl1Selected.name?.toLocaleLowerCase()}</h4>
              <NavLink fullWidth item={itemLvl1Selected} onClick={close}>
                <Button color="primary" variant="outline" type="button">
                  <span className="fa-font-semibold">Ver todos</span>
                </Button>
              </NavLink>
            </S.OverlayNavItemTitle>
            <S.lvl2List>
              {itemLvl1Selected.children?.map((lvl2: INavItem) => (
                <li key={lvl2.id}>
                  <div>{getLink(lvl2)}</div>
                  {lvl2.children && (
                    <S.lvl3List>
                      {lvl2.children.map((lvl3: INavItem) => (
                        <li key={lvl3.id}>{getLink(lvl3)}</li>
                      ))}
                    </S.lvl3List>
                  )}
                </li>
              ))}
            </S.lvl2List>
          </S.OverlayNavItems>
        )}
      </S.Overlay>
    </S.Wrapper>
  );
};
