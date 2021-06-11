import { IconHamburger, NavLink } from "@temp/@next/components/atoms";
import React from "react";
import { IProps } from "./types";
import * as S from "./styles";
import { OverlayNav } from "@temp/components";
import { Button } from "@farmacia-retail/farmauna-components";


export const DesktopNav: React.FC<IProps> = ({ categories, navMain }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <>
            <S.Wrapper>
              <div
                  className="fa-flex fa-cursor-pointer fa-items-center"
                  onClick={() => {
                      setOpen(prev => !prev);
                  }}
              >
                <Button iconOnly icon={<IconHamburger open={open} />} />
                <div className="fa-px-3 fa-text-white fa-block">Categorías</div>
              </div>
              <ul>
                  {navMain.map(it => <li key={it.id}><NavLink item={it} /></li>)}
              </ul>
            </S.Wrapper>
            {
                open &&
                <OverlayNav
                    categories={categories}
                    close={() => { setOpen(false) }}
                />
            }
        </>
    );
}
