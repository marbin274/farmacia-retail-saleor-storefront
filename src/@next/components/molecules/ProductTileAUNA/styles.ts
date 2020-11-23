import { media, styled } from "@styles";
import {aunaBlack, aunaGrey100, aunaInteractive, white, aunaDisabled} from "@styles/constants";

export const ProductCard = styled.div<{
    quantityAvailable?: number | undefined;
  }>`
  color: ${aunaBlack}
  background: inherit;
  ${
    ({quantityAvailable}) => quantityAvailable && quantityAvailable > 0 
    ? `border-bottom: 1px solid ${aunaInteractive}`
    : `border-bottom: 1px solid ${aunaDisabled}`
  }
  height: 24rem;
  text-align: center;
  transition: 0 .3s;
  width: 11rem;
  position: relative;
  :hover {
    translate-Y: -.1rem;
  }

  ${media.largeScreen`
  `}
`;

export const Title = styled.h4`
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.4;
  margin-top: .5rem;
  padding: .4rem 0;
  text-align: center;
`;

export const ProductAttribute = styled.h5`
  color: ${aunaGrey100};
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: normal;
  padding: .1rem 0;
  text-align: center;
`;

export const Price = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  font-weight: normal;
  margin-top: .5rem;
  padding: .7rem 0;
  text-align: center;
`;

export const Image = styled.div`
  width: auto;
  height: 176px;
  max-width: 100%;
  margin-top: 2.5rem;
  vertical-align:middle;
  > img {
    width: auto;
    height: auto;
    max-width: 100%;
    vertical-align:middle;
  }
`;

export const AddToCartButton = styled.div`
  bottom: .2rem;
  border: 1px solid ${white};
  border-radius: 6px;
  color: ${aunaInteractive};
  font-size: 1.6rem;
  left: calc((11rem - 3.6rem) / 2);
  padding: 1.2rem;
  position: absolute;
  text-align: center;
  :hover {
    border-color: ${aunaInteractive};
  }
`;

export const DisabledAddToCartButton = styled.div`
  bottom: .2rem;
  border: 1px solid ${white};
  border-radius: 6px;
  color: ${aunaDisabled};
  font-size: 1.6rem;
  left: calc((11rem - 3.6rem) / 2);
  padding: 1.2rem;
  position: absolute;
  text-align: center;
`;