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
            Gracias por participar en la prueba y creación de esta primera versión. Nuestro objetivo es brindarte una experiencia distinta y valiosa, pero es posible que encuentres algunos errores.
            </p>
            <p>
            Sé parte de este proyecto y cuéntanos si encuentras algún problema a:
            </p>
            <br />
            <EmailLink link="ayuda@auna.pe" />
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
