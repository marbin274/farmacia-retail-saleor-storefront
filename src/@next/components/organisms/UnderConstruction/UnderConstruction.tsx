import { EmailLink } from '@components/atoms/EmailLink';
import {
  Overlay,
  OverlayContextInterface,
} from '@temp/@next/components/organisms/OverlayComponent';
import { CONSULTATION_EMAIL, PHONE_NUMBER } from '@temp/core/config';
import React from 'react';
import { ReactSVG } from 'react-svg';
import * as S from './styles';

export const UnderConstruction: React.FC<{ overlay: OverlayContextInterface }> =
  ({ overlay }) => {
    const { hide } = overlay;

    return (
      <Overlay context={overlay}>
        <S.Wrapper>
          <S.Card>
            <S.CardText>
              <S.CardHeader>¡Bienvenid@ a Farmauna!</S.CardHeader>
              <p>
                Nos emociona de que seas uno de nuestros primeros usuarios.
                Seguimos trabajando para que tengas la mejor experiencia digital
                en farmacia.
              </p>
              <p>Si tienes algún obstáculo durante tu visita, cuéntanos a:</p>
              <br />
              <EmailLink link={CONSULTATION_EMAIL} /> o{' '}
              <span>{PHONE_NUMBER}</span>
            </S.CardText>

            <S.CardImageContainer>
              <S.CardImage>
                <ReactSVG src="/assets/auna/under-construction.svg" />
              </S.CardImage>
            </S.CardImageContainer>

            <S.CloseButton onClick={hide}>
              <ReactSVG src="/assets/modal-close.svg" />
            </S.CloseButton>
          </S.Card>
        </S.Wrapper>
      </Overlay>
    );
  };
