import { media, mediaUp, styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  height:4rem;
  display:flex;
  align-items:center;
  margin-bottom:1rem;

  ${media.smallScreen`
    border-radius: 0;
  `}
  > span {
    color: #908BA7;
  }
`;

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.theme.typography.smallFontSize};
  width:100%;
  ${media.mediumScreen`
    flex-direction: row;
    
  `}
`;

export const LeftSide = styled.div`
  align-items: center;
    
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
    color: #452FBA;
    display:flex;
    align-items:center;
  }
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem .8rem;
  width: 100%;
  font-size:20px;
  align-items:center;
  font-weight:600;
  ${media.smallScreen`
    font-size:16px;
`}
  .select-input{
    justify-content: flex-end;
    .clear-label {
      margin-right: 1rem;
      width: 14.75rem;
      height: 2.5rem;
      border-radius: 40px;
      background: #FFFFFF;
      border: 1px solid #908BA7;
      position:relative;
      padding:0 0 0 15px;
      display:flex;
      align-items: center;
      justify-content: flex-start;
      ${media.smallScreen`
        margin-right:0;
  `}
    }
  }

  ${media.mediumScreen`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`}
  ${media.xSmallScreen`
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`}
 
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
  margin-top: 1.5rem;
`}
${mediaUp.xSmallScreen`
  margin-top: 1.5rem;
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
  color:#2F2C3A;
`;

export const SearchText = styled.span`
  color: ${props => props.theme.colors.interactive};
`;

export const Sort = styled.div`
  width: inherit;
  display: inline-block;
  margin-bottom:20px;

  .label {
    display: block;
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
  display:none;
`;

export const NumberProducts = styled.span`
  font-weight: ${({theme}) =>theme.typography.boldFontWeight};
`
;