import { styled, media } from "@styles";
import { turquoise } from "@styles/constants";

export const Wrapper = styled.div`
  margin: 2.5rem 1.5rem 1.5rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

export const Title = styled.div`
  color: #452fba;
  font-size: ${({ theme }) => theme.typography.baseFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  padding: 1.5rem 2rem;
`;

export const TitleText = styled.span``;

export const Body = styled.div`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  border-top: 1px solid ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: ${({ theme }) => theme.typography.normalFontWeight};
  padding: 0rem 2rem;
`;
export const LineInfo = styled.div`
  display: flex;
  margin: 1.5rem 0rem;
`;
export const LineInfoDescription = styled.div`
  flex: 1;
  color: #908ba7;
  &.line-info-total {
    color: #23212b;
  }
`;
export const LineInfoDescriptionDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${media.xSmallScreen`
        min-width: 15rem;
  `};

  > button {
    outline: none;
    span {
      margin-left: 0;
      font-weight: 600;
    }
  }

  > span {
    color: #908ba7;
  }
`;
export const LineInfoPrice = styled.div``;

export const ShowDetailResumeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  border: 0.0625rem solid ${turquoise};
  width: 6.1875rem;
  height: 2rem;
  color: ${turquoise};
  cursor: pointer;
`;

export const Footer = styled.div`
  color: ${({ theme }) => theme.colors.shippingMethodBlack};
  font-size: ${({ theme }) => theme.typography.baseFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  padding: 1rem 2rem;
  > div {
    margin: 0px;
  }
`;
