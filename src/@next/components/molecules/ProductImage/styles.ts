import { media, styled } from "@styles";
import { white } from "@styles/constants";

export const Wrapper = styled.div`
  width: 35rem;
  min-width: 34.5rem;
  height: 35rem;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  position: relative;
  background: ${white};
  border-radius: 1rem;

  ${media.largeScreen`
    width: calc(100vw - 3rem);
    min-width: 14.5rem;
    margin: auto;
    height: 20.625rem;
    margin-bottom: 2.5rem;
    justify-content: flex-start;
  `}
`;

export const ImageFrame = styled.div<{
  canAddToCart?: boolean;
}>`
  display: flex;
  position: relative;
  border: 0.125rem solid ${white};
  justify-content: center;
  align-items: center;
  background: ${white};
  border-radius: 1rem;
  width: 100%;
  height: 100%;

  .GlassMagnifier {
    max-width: 22.25rem;
    max-height: 26.625rem;
    height: 100%;
    > div {
      height: 100%;
      > img  {
        max-height: 26.625rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    width: 100%;
    ${({ canAddToCart }) => (canAddToCart ? "opacity: 1;" : "opacity: 0.5;")}
  }

  ${media.largeScreen`
      margin: auto;
      width: 13.5rem;
      height: 17.5rem;
  `}
`;
