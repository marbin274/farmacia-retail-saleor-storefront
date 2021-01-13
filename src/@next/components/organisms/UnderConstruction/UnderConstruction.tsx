import { EmailLink } from "@components/atoms/EmailLink";
import React from "react";

import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";

import ReactSVG from "react-svg";
import * as S from "./styles";


export const UnderConstruction: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
  const hide = () => overlay.hide();

  return (
    <Overlay context={overlay} className="overlay--no-background">
      <S.Wrapper>
        <S.Card>
          <S.CardText>
            <S.CardHeader>
              ¡Bienvenidos a Farmauna (versión Beta)!
            </S.CardHeader>
            <p>
            En estos momentos estamos trabajando en mejorar tu experiencia y no podremos atenderte.
            </p>
            <p>
            Agradecemos tu comprensión. Puedes contactarnos a:
            </p>
            <br />
            <EmailLink link="consultas@farmauna.com" />
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
