import { media, styled } from "@styles";
import { aunaInteractive, aunaBrand5, white } from "@styles/constants";

export const Wrapper = styled.div`
  width: 732px;
  min-width: 552px;
  height: 518px;
  margin-left: -5rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;

  ${media.largeScreen`
    width: 100vw;
    height: 312px;
    margin-left: -16px;
    margin-bottom: 48px;
    justify-content: flex-start;
  `}
`;

export const DecorativeSquare = styled.div`
  width: 536px;
  height: 519px;
  background: ${aunaInteractive};
  position: absolute;
  top: 0;
  left: 0;

  ${media.largeScreen`
    width: 100vw;
    height: 198px;
  `}
`;

export const ImageFrame = styled.div<{
  outStock?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${white};
  border-radius: 16px;
  width: 412px;
  height: 518px;
  position: absolute;
  overflow: hidden;
  top: 62px;

  > img {
    max-width: 356px;
    max-height: 426px;
    width: 100%;
    ${({ outStock }) => (outStock ? "opacity: 0.5;" : "opacity: 1;")}
  }

  ${media.largeScreen`
      margin-left: 22px;
      top: 32px;
      width: 216px;
      height: 280px;
  `}
`;

export const OutStockLabel = styled.p`
  position: absolute;
  top: -19px;
  left: -53px;
  transform: rotate(-43.6deg);
  background: ${aunaBrand5};
  color: ${white};
  width: 166px;
  height: 86px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 12px;
  font-size: 16px;
  z-index: 2;

  ${media.largeScreen`
    top: -25px;
    left: -62px;
  `}
`;
