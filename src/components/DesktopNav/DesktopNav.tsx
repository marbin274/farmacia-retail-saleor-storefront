import { Button, IconHamburger, NavLink } from "@temp/@next/components/atoms";
import React from "react";
import { IProps } from "./types";
import * as S from "./styles";
import { OverlayNav } from "@temp/components";

export const DesktopNav: React.FC<IProps> = ({ categories, navMain }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <>
            <S.Wrapper>
                <Button
                    onClick={() => {
                        setOpen(prev => !prev);
                    }}
                >
                    <IconHamburger open={open} />
                    <span>Categorías</span>
                </Button>
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
