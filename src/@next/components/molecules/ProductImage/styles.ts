import { media, styled } from "@styles";
import { aunaBrand5, white, aunaGrey40 } from "@styles/constants";

export const Wrapper = styled.div`
  width: 612px;
  min-width: 552px;
  height: 718px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  background: ${aunaGrey40};

  ${media.largeScreen`
    width: 100vw;
    height: 198px;
    margin-left: -16px;
    margin-bottom: 148px;
    justify-content: flex-start;
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
  top: 60px;
  margin-right: 40px;

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
