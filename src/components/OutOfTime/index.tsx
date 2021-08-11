import { Button, EmailLink } from "@components/atoms";
import { Overlay, OverlayContextInterface } from "@temp/components/Overlay";
import { CONSULTATION_EMAIL } from "@temp/core/config";
import OutOfTimeIcon from "@temp/images/auna/out-of-time.svg";
import * as React from "react";
import * as S from "./styles";
export interface IProps {
  overlay: OverlayContextInterface;
}

const OutOfTime = ({ overlay }: IProps) => {
  const { hide } = overlay;
  return (
    <Overlay context={{ ...overlay, hide: undefined }}>
      <S.Wrapper className="fa-absolute fa-top-4 fa-left-1/2 fa-transform fa--translate-x-1/2 fa-h-80 fa-max-w-3xl sm:fa-top-1/3">
        <div className=" fa-bg-neutral-lightest fa-rounded-2xl fa-p-8 fa-border fa-border-solid fa-border-neutral-light fa-text-black">
          <div>
            <h4 className="fa-font-semibold">
              Hola, tus compras después de las 11:00 p.m. llegarán al día
              siguiente a partir de las 7:00 a.m.
            </h4>
          </div>
          <div className="fa-flex fa fa-flex-wrap">
            <S.BodyTextWrapper>
              <div>
                <p className="fa-my-5 fa-mx-0">
                  Si tienes dudas comunícate con nosotros.
                </p>
                <EmailLink link={CONSULTATION_EMAIL} />
              </div>
              <S.BodyButtonWrapper className="fa-hidden sm:fa-block">
                <br />
                <Button fullWidth onClick={hide}>
                  Entendido
                </Button>
              </S.BodyButtonWrapper>
            </S.BodyTextWrapper>
            <S.OutOfTimeIcon
              path={OutOfTimeIcon}
              className="fa-rounded-2xl fa-text-center fa-px-4 fa-pt-8 fa-pb-4 fa-w-full"
            />
            <div className="fa-w-full fa-block sm:fa-hidden">
              <S.FooterButtonWrapper>
                <Button fullWidth onClick={hide}>
                  Entendido
                </Button>
              </S.FooterButtonWrapper>
            </div>
          </div>
        </div>
      </S.Wrapper>
    </Overlay>
  );
};

export default OutOfTime;
