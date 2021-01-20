import { EmailLink } from "@components/atoms/EmailLink";
import React from "react";

import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";

import ReactSVG from "react-svg";
import * as S from "./styles";


export const UnderConstruction: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const hide = () => overlay.hide();

  return (
    <Overlay context={overlay}>
      <S.Wrapper>
        <S.Card>
          <S.CardText>
            <S.CardHeader>
              ¡Bienvenid@ a Farmauna!
            </S.CardHeader>
            <p>
              Nos emociona de que seas uno de nuestros primeros usuarios. Seguimos trabajando para que tengas la mejor experiencia digital en farmacia.
            </p>
            <p>
              Si tienes algún obstáculo durante tu visita, cuéntanos a:
            </p>
            <br />
            <EmailLink link="consultas@farmauna.com" /> o <span>01 3913655</span>
          </S.CardText>

          <S.CardImageContainer>
            <S.CardImage>
              <ReactSVG path={S.underConstructionIcon} />
            </S.CardImage>
          </S.CardImageContainer>

          <S.CloseButton onClick={hide}>
            <ReactSVG path={S.closeIcon} />
          </S.CloseButton>
        </S.Card>

      </S.Wrapper>
    </Overlay>
  );
};
