import React from "react";

import { Icon } from "@components/atoms";
import { useHandlerWhenClickedOutside } from "@hooks";
import { turquoise, aunaBlack } from "@temp/@next/globalStyles/constants";

import { Link } from "react-router-dom";
import * as S from "./styles";
import { IProps } from "./types";

export const AccountMenuMobile: React.FC<IProps> = ({
  links,
  active,
}: IProps) => {
  const [showMenu, setShowMenu] = React.useState(false);

  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    setShowMenu(false);
  });

  const getActiveSectionName = () => {
    const link = links.find(x => x.url === active);
    return link?.label || '';
  }

  return (
    <S.Wrapper
      onClick={() => {
        setShowMenu(true);
      }}
      ref={setElementRef()}
    >
      {getActiveSectionName()}
      <Icon name="select_arrow" size={8} color={turquoise} />
      {showMenu && (
        <S.Overlay>
          <S.MenuHeader>Mi Cuenta</S.MenuHeader>
          {links.map(link => {
            return (
              <div
                onClick={evt => {
                  evt.stopPropagation();
                  setShowMenu(false);
                }}
                key={link.url}
              >
                <Link to={link.url}>
                  <S.MenuItem active={active === link.url}>
                    {link.label}
                    <Icon
                      name="select_arrow"
                      size={8}
                      color={active === link.url ? turquoise : aunaBlack}
                    />
                  </S.MenuItem>
                </Link>
              </div>
            );
          })}
        </S.Overlay>
      )}
    </S.Wrapper>
  );
};
