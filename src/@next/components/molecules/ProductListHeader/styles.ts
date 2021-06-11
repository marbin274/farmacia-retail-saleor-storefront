import { media, mediaUp, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.aunaGrey06};
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
  flex-direction: column;
  ${mediaUp.mediumScreen`
    flex-direction: row;
    background-color: #F1F2F7;
  `}
`;

export const LeftSide = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.aunaDisabledBackground};  
  display: flex;
  justify-content: space-between;
  padding: 1rem .8rem;
  width: 100%;
  ${mediaUp.mediumScreen`
    justify-content: space-between;
    width: 24rem;
  `}
  span, button {
    color: ${props => props.theme.colors.interactive};
    font-size: ${props => props.theme.typography.smallFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
  }
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem .8rem;
  width: 100%;
  ${mediaUp.mediumScreen`
    background-color: ${(props: any) => props.theme.colors.aunaDisabledBackground};
    justify-content: flex-end;
  `}
  .select-input{
    justify-content: flex-end;
    .clear-label {
      margin-right: 1rem;
    }
  }
`;
export const FiltersButton = styled.button`
  font-size: ${props => props.theme.typography.smallFontSize};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Clear = styled.button`
  display: flex;
  color: ${props => props.theme.colors.lightFont};
  cursor: pointer;
  padding-left: 2rem;
  font-size: ${props => props.theme.typography.smallFontSize};
  > span {
    margin-left: .5rem;
  }
  ${mediaUp.mediumScreen`
    padding-left: 0px;
    width: 7rem;
  `}
`;

export const Element = styled.span`
${mediaUp.mediumScreen`
  margin-left: 1rem;
`}
`;

export const Filters = styled.span`
  display: flex;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
  > span {
    margin-left: .5rem;
  }
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.greyText};
`;

export const Sort = styled.div`
  width: inherit;
  display: inline-block;

  .label {
    display: none;
    ${mediaUp.mediumScreen`
      display:  block;
    `}
  }

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
  margin-top: .5rem;
  padding: 0rem .5rem;
  > div {
    margin: 0.4rem;
  }
`;

export const NumberProducts = styled.span`
  font-weight: ${({theme}) =>theme.typography.boldFontWeight};
`
