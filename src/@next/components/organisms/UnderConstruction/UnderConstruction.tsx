import {EmailLink} from "@components/atoms/EmailLink";
import React from "react";

import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";

import ReactSVG from "react-svg";
import * as S from "./styles";


export const UnderConstruction: React.FC<{ overlay: OverlayContextInterface }> = ({overlay}) => {
  const hide = () => overlay.hide();

  return (
    <Overlay context={overlay} className="overlay--no-background">
      <S.Wrapper>
        <S.Card>
          <S.CardText>
            <S.CardHeader>
              Página en costrucción
            </S.CardHeader>
            <p>
              Esta página se encuentra en una versión beta y es posible que te encuentres con algunos errores.  Pedimos disculpas por los inconvenientes, muy pronto tendremos una versión mejorada para ti.
            </p>
            <p>
              Para cualquier problema escribenos:
            </p>
            <p>
              <EmailLink link="ayuda@auna.pe"/>
            </p>
          </S.CardText>

          <S.CardImageContainer>
            <S.CardImage>
              <ReactSVG path={S.underConstructionIcon}/>
            </S.CardImage>
          </S.CardImageContainer>

          <S.CloseButton onClick={hide}>
            <ReactSVG path={S.closeIcon}/>
          </S.CloseButton>
        </S.Card>

      </S.Wrapper>
    </Overlay>
  );
};
