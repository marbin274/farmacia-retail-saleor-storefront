import { useMediaScreen } from "@temp/@next/globalStyles";
import closeDesktop from "@temp/images/close-mobile-desktop.svg";
import closeMobile from "@temp/images/close-modal-mobile.svg";
import React from "react";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { IProps } from "./types";

export const ModalBackground: React.FC<IProps> = ({
  hide,
  show,
  target,
  imageDesktop,
  imageMobile,
}: IProps) => {
  const { isMobileScreen } = useMediaScreen();

  return (
    <S.OverlayStyled position="center" show={show} hide={hide} target={target}>
      <S.ModalContainer>
        <S.Modal imageDesktop={imageDesktop} imageMobile={imageMobile}>
          <S.CloseDiv onClick={hide}>
            <ReactSVG path={isMobileScreen ? closeMobile : closeDesktop} />
          </S.CloseDiv>
        </S.Modal>
      </S.ModalContainer>
    </S.OverlayStyled>
  );
};
