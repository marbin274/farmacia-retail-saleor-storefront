import { Button, Icon, NavLink } from "@temp/@next/components/atoms";
import { generateCategoryUrl } from "@temp/core/utils";
import React from "react";
import { INavItem } from "../MobileNav";
import * as S from "./styles";

interface IProps {
    categories: INavItem[] | null;
}

export const OverlayNav: React.FC<IProps> = ({ categories }) => {
    const [item, setItem] = React.useState<INavItem | null>(null);
    return (
        <S.Wrapper
            onMouseLeave={() => { setItem(null) }}
        >
            <S.lvl1List>
                {categories.map(it =>
                    <li
                        key={it.id}
                        onMouseEnter={() => { setItem(it); }}
                    >
                        <a href={generateCategoryUrl(it.id, it.name)}>
                            <span>{it.name}</span>
                            <Icon name="arrow_right" size={18} viewPort={24} />
                        </a>
                    </li>
                )}
            </S.lvl1List>
            {
                item &&
                <S.OverlayNavItems>
                    <S.OverlayNavItemTitle>
                        <h4>{item.name}</h4>
                        <a href={generateCategoryUrl(item.id, item.name)}>
                            <Button
                                color="primary"
                                outline
                                type="button"
                            >
                                Ver todos
                        </Button>
                        </a>
                    </S.OverlayNavItemTitle>
                    <S.divide />
                    <S.lvl2List>
                        {item.children?.map(lvl2 =>
                            <li>
                                <div><NavLink fullWidth item={lvl2} /></div>
                                {
                                    lvl2.children &&
                                    <S.lvl3List>
                                        {lvl2.children.map(lvl3 => <li><NavLink fullWidth item={lvl3} /></li>)}
                                    </S.lvl3List>
                                }
                            </li>)}
                    </S.lvl2List>
                </S.OverlayNavItems>
            }
        </S.Wrapper>
    );
}
