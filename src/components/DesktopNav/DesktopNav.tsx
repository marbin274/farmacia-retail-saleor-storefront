import { IconHamburger, NavLink } from "@temp/@next/components/atoms";
import React from "react";
import { IProps } from "./types";
import * as S from "./styles";
import { OverlayNav } from "@temp/components";
import { Button } from "@farmacia-retail/farmauna-components";
import { useClickedOutside } from "@temp/@next/hooks";

export const DesktopNav: React.FC<IProps> = ({ categories, navMain }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { clickedOutside, setElementRef } = useClickedOutside();

  const hideMenu = () => setOpen(false);

  React.useEffect(() => {
    hideMenu();
  }, [clickedOutside]);

  return (
    <div ref={setElementRef()}>
      <S.Wrapper>
        <div
          className="fa-flex fa-cursor-pointer fa-items-center"
          onClick={() => {
            setOpen(prev => !prev);
          }}
        >
          <S.CategoryButton iconOnly icon={<IconHamburger open={open} />} />
          <div className="fa-px-3 fa-text-white fa-block">Categorías</div>
        </div>
        <S.List onClick={hideMenu}>
          {navMain.map(it => {
            return (
              <S.ListItem key={it.id}>
                {it.collection ? (
                  <NavLink item={it}>
                    <Button
                      color="secondary"
                      size="small"
                      type="button"
                      variant="outline"
                    >
                      {it.name?.toLowerCase()}
                    </Button>
                  </NavLink>
                ) : (
                  <NavLink item={it} />
                )}
              </S.ListItem>
            );
          })}
        </S.List>
      </S.Wrapper>
      {open && (
        <OverlayNav
          categories={categories}
          close={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};
