import { styled, media, DefaultTheme } from "@styles";
import { aunaBlack, baseFontSize } from "@styles/constants";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const WrapperProduct = styled.div`
  width: calc(100% - 5rem);
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.smallScreen`
    width: 100%;
  `}
`;
export const WrapperImage = styled.div`
  display: flex;
  position: relative;
`;

export const Photo = styled.div`
  width: 4.25rem;
  height: 4.25rem;
  border: 0.0625rem solid #c8c5d3;
  border-radius: 0.5rem;
  display: flex;
  img {
    height: auto;
    max-height: 3rem;
    max-width: 60px;
    object-fit: cover;
    margin: auto;
  }
`;

export const Quantity = styled.div`
  display: flex;
  color: ${aunaBlack};
  font-size: 0.875rem;
  font-weight: 500;
  position: absolute;
  top: -0.75rem;
  right: -0.75rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #452fba;
  border-radius: 50%;
  color: ${({ theme }: { theme: DefaultTheme }) => theme.colors.white};
  span {
    margin: auto;
  }
`;

export const WrapperDetail = styled.div`
  display: flex;
  flex-direction: column;
  ${media.smallScreen`
    min-width: calc(100% - 3.25rem);
  `}
`;

export const Name = styled.div`
  min-height: 2.5rem;
  margin: 0rem .5rem 0rem 1.25rem;
  font-size: ${props => props.theme.typography.baseFontSize};
  line-height: 1.25rem;
  color: #908ba7;
  ${media.smallScreen`
    font-size: ${(props: any) => props.theme.typography.baseFontSizeSmall};
  `}
`;

export const Price = styled.div`
  text-align: right;
  color: #00bf8e;
  .price {
    font-weight: ${(props: any) => props.theme.typography.boldFontWeight};
    font-size: ${baseFontSize};
    &.discounted_price{
      margin: 0 0 0 1rem;
    }
  }
  ${media.smallScreen`
    text-align: left;
    margin-left: 1.25rem;
  `}
`;
