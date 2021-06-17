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

  ${media.mediumScreen`
    grid-template-columns: 1fr;
    grid-template-areas:
      "navigation"
      "checkout"
      "button";
  `}
`;

export const Navigation = styled.div`
  position: relative;
  grid-area: navigation;
  padding-top: 1.75rem;
  padding-bottom: 1.875rem;
  background-color: #00bf8e;
  border-bottom-left-radius: 3.125rem;
`;

export const FormSummyContainer = styled.div`
  ${mediaUp.mediumScreen`
    display: flex;
    justify-content: space-between;
  `}
`;

export const Checkout = styled.div`
  grid-area: checkout;
  max-width: 43rem;
  flex: 1;
  padding-top: 1.5rem;
  padding-bottom: 3rem;
  ${mediaUp.mediumScreen`
    min-width: 26rem;
  `}
  ${media.smallScreen`
    padding-bottom: 5.5rem;
  `}
`;
export const CartSummary = styled.div`
  margin-top: 2rem;
  background-color: #fff;
  ${mediaUp.mediumScreen`
    max-width: 24rem;
    margin-top: 0;
  `}
  ${media.smallScreen`
    margin-top: 0;
  `}
`;

export const CheckoutOptions = styled.div`
  ${media.smallScreen`
    width: 100vw;
    transform: translateX(-1rem);
    background-color: #fff;
    padding: 1rem;
  `}

  > div {
    &:nth-child(1) {
      margin: 1rem 0rem;
    }
  }
`;

export const Button = styled.div<{ disabled: boolean }>`
  ${media.smallScreen`
    max-width: 100%;
    display: flex;
    justify-content: center;
  `}
`;
