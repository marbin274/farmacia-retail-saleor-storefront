import { media, styled } from "@styles";
import { white, aunaGrey40 } from "@styles/constants";

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
  canAddToCart?: boolean;
}>`
  display: flex;
  border: 2px solid ${aunaGrey40};
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
    ${({ canAddToCart }) => (canAddToCart ? "opacity: 1;" : "opacity: 0.5;")}
  }

  ${media.largeScreen`
      margin-left: 22px;
      top: 32px;
      width: 216px;
      height: 280px;
  `}
`;
