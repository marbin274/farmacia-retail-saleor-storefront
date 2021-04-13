import { media, mediaUp, styled } from "@styles";

export const Loader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 10;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  padding: 3rem 0 3rem 0;

  ${media.mediumScreen`
    grid-template-columns: 1fr;
    grid-template-areas:
      "navigation"
      "checkout"
      "button";
  `}
`;

export const Navigation = styled.div`
  grid-area: navigation;
  padding-bottom: 43px;
  height: 85px;
`;

export const FormSummyContainer = styled.div`
  ${mediaUp.mediumScreen`
    display: flex;
  `}
`

export const Checkout = styled.div`
  grid-area: checkout;
  padding: 1rem 0;
  max-width: 43rem;
  ${mediaUp.mediumScreen`
    min-width: 26rem;
  `}
`;
export const CartSummary = styled.div`
 
`;
export const Button = styled.div`
  max-width: 16.25rem;
  ${media.smallScreen`
    max-width: 100%;
    display: flex;
    justify-content: center;
  `}
  >  {
    &:first-child {
      padding: 0.9rem 1.5rem;
      > {
        &:first-child{
          font-size: 1rem;
          ${media.smallScreen`
          font-size: 1rem;
          `}
          ${media.xSmallScreen`
            font-size: 0.875rem;
          `}

        }
      }
    }
  }
`;
