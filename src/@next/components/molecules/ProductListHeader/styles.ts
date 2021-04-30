import { media, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.aunaDisabledBackground};
  padding: 1.5rem;
  border-radius: 0.5rem;

  ${media.smallScreen`
    border-radius: 0;
  `}
`;

export const Bar = styled.div`
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
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.smallScreen`
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
  color: ${props => props.theme.colors.greyText};
`;

export const Sort = styled.div`
  width: 12rem;
  display: inline-block;

  ${media.smallScreen`
    margin-top: 1rem;
  `}

  > div {
    margin: 0;
    padding: 0;

    > div {
      margin: 0;
      padding: 0;

      > div {
        margin: 0;
        padding: 0;

        > div {
          margin: 0;
          padding: 0;
        }
      }
    }
  }
`;

export const FiltersChipsWrapper = styled.div`
  > div {
    margin: 0.4rem;
  }
`;
