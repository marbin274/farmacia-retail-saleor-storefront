import { useClickedOutside } from "@hooks";
import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { IProps } from "./types";

export const DropdownMenu: React.FC<IProps> = ({
  header,
  items,
  type,
}: IProps) => {
  const [visible, setVisible] = useState(false);
  const { clickedOutside, setElementRef } = useClickedOutside();

  useEffect(() => {
    setVisible(false);
  }, [clickedOutside]);

  return (
    <S.Wrapper
      ref={setElementRef()}
      onMouseEnter={() => type === "hoverable" && setVisible(true)}
      onMouseLeave={() => type === "hoverable" && setVisible(false)}
      onClick={() => type === "clickable" && setVisible(!visible)}
    >
      {header}
      {visible && (
        <S.Content>
          <ul>
            {items.map((element, id) => (
              <li
                key={id}
                onClick={() => {
                  setVisible(false);
                  element.onClick();
                }}
              >
                {element.content}
              </li>
            ))}
          </ul>
        </S.Content>
      )}
    </S.Wrapper>
  );
};
