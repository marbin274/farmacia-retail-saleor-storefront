import { styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.tile.backgroundColor};
  margin-top: 22px;
  margin-bottom: 60px;
`;

export const Bar = styled.div`
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSide = styled.div`
  height: 1.2rem;
`;

export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Clear = styled.button`
  padding-left: 2rem;
  cursor: pointer;
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
`;
export const Element = styled.span`
  padding-left: 2rem;
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
