import React from "react";
import { Container } from "@components/templates";
import ReactSVG from "react-svg";
import * as S from "./styles";
import { IProps } from "./types";
import mailSentSvg from "images/auna/mail-sent.svg";

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderNumber,
  continueShopping,
  orderDetails,
  overlay,
  sequentialCode,
}: IProps) => {
  return (
    <Container>
      <S.Wrapper>
        <S.ThankYouHeader>
          <span>Gracias</span>
          <br />
          por tu compra
        </S.ThankYouHeader>
        <S.OrderInfo>
          El código de tu orden es: <span>{sequentialCode}</span>
        </S.OrderInfo>
        <S.MailInfo>
          <S.MailInfoIcon>
            <ReactSVG path={mailSentSvg} />
          </S.MailInfoIcon>
          <S.MailInfoText>
            Recibirás en tu correo electrónico la confirmación y detalle de tu
            compra
          </S.MailInfoText>
        </S.MailInfo>
        <S.Buttons>
          <S.SecondaryButton onClick={continueShopping}>
            Continuar comprando
          </S.SecondaryButton>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };
