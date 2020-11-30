import { media, styled } from "@styles";

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
  display: grid;

  grid-template-columns: 8fr 4fr;
  grid-template-rows: 85px auto auto;
  grid-column-gap: 30px;
  grid-template-areas:
    "navigation navigation"
    "checkout cartSummary"
    "button cartSummary";
  
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

export const Checkout = styled.div`
  grid-area: checkout;
  padding: 3rem 0;
`;
export const CartSummary = styled.div`
  grid-area: cartSummary;
  padding-top: 6rem;
  
  ${media.mediumScreen`
    position: fixed;
    bottom: 0;
  `}
`;
export const Button = styled.div`
  grid-area: button;
`;
