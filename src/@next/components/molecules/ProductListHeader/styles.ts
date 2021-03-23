import { media, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.tile.backgroundColor};
`;

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.xxxLargeScreen`
    padding-top: 1.225rem;
  `}
  ${media.smallScreen`
    padding-top: 2.5rem;
  `}
  font-size: ${props => props.theme.typography.smallFontSize};
`;
export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  height: 3.9rem;
  ${media.smallScreen`
    height: 1.625rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
  `}
`;
export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
  ${media.smallScreen`
    display: none;
  `}
`;

export const Clear = styled.button`
  padding-left: 2rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
`;
export const Element = styled.span`
  padding-left: 2rem;
  ${media.smallScreen`
    padding-left: 0rem;
  `}
`;

export const Filters = styled.span`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.lightFont};
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
  }
`;
