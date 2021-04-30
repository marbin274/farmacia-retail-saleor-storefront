import React, { FC } from "react";
import { Container } from "./styles";

export type IPageItemProps = {
  selected?: boolean;
  onClick: () => void;
};

export const PageItem: FC<IPageItemProps> = ({
  children,
  selected,
  onClick,
}) => (
  <Container selected={selected} onClick={onClick}>
    {children}
  </Container>
);
