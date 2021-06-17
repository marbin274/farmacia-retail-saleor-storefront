import React from "react";
import * as S from "./styles";
import { IProps } from "./types";
import { BulletXFilledIcon } from "@farmacia-retail/farmauna-components";

export const CardHeader: React.FC<IProps> = ({
  children,
  customIcon,
  divider = false,
  onHide,
  textStyle = "title",
  titleSize = "md",
}: IProps) => {
  const withCloseIcon = !!onHide && !customIcon;

  return (
    <S.Header divider={divider}>
      {textStyle === "title" ? (
        <S.Title size={titleSize}>{children}</S.Title>
      ) : (
        <S.Paragraph>{children}</S.Paragraph>
      )}
      {withCloseIcon && (
        <BulletXFilledIcon
          size={32}
          color="#452FBA"
          onClick={onHide}
          className="overlay__header__close-icon"
        />
      )}
      {customIcon}
    </S.Header>
  );
};
