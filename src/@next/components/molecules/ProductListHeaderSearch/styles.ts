import { media, mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  ${media.largeScreen`
    border-radius: 0;
    height: auto;
  `}
  > span {
    color: #908ba7;
  }
`;

export const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => props.theme.typography.smallFontSize};
  width: 100%;
  ${media.mediumScreen`
    flex-direction: row;
  `}
`;

export const LeftSide = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.8rem;
  width: 100%;
  ${mediaUp.mediumScreen`
    justify-content: space-between;
    width: 24rem;
  `}
  span, button {
    color: ${props => props.theme.colors.interactive};
    font-size: ${props => props.theme.typography.smallFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
    color: ${farmatheme.theme.colors.interactive};
    display: flex;
    align-items: center;
  }
`;

export const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0.8rem;
  width: 100%;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 600;
  ${media.smallScreen`
    font-size:1rem;
`}
  .select-input {
    & > span {
      color: ${farmatheme.theme.colors.neutral.darkest};
    }
    justify-content: flex-end;
    .select-container {
      margin-left: 1rem;
      min-width: 14.75rem;
      max-width: 14.75rem;
      height: 2.5rem;
      border-radius: 2.5rem;
      background: #ffffff;
      border: 0.0625rem solid #908ba7;
      position: relative;
      padding: 0 0 0 0.9375rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      justify-content: space-between;
      padding: 0 1rem;
      cursor: pointer;
      z-index: 1;
      &__value {
        margin: 0;
      }
    }
    ${media.smallScreen`  
        align-items: center;
        justify-content: space-between;
        width: 100vw;
        display: flex;
        padding: 0 1rem;  
        .select-container {
          margin-left: 0.5rem;
          min-width: 12.875rem;
          max-width: 12.875rem;
        }
    `}
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
    margin-left: 0.5rem;
  }
  ${mediaUp.mediumScreen`
    padding-left: 0rem;
    width: 7rem;
  `}
`;

export const Element = styled.span`
  ${mediaUp.largeScreen`
    margin-top: 1.5rem;
  `}
`;

export const Filters = styled.span`
  display: flex;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0.6rem;
  > span {
    margin-left: 0.5rem;
  }
`;

export const Label = styled.span`
  color: ${props => props.theme.colors.greyText};
  color: #2f2c3a;
`;

export const SearchText = styled.span`
  color: ${props => props.theme.colors.interactive};
`;

export const Sort = styled.div`
  width: inherit;
  display: inline-block;
  margin-bottom: 1rem;

  ${mediaUp.largeScreen`
    margin-bottom: 1.25rem;
  `}
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
        ${media.smallScreen`
          display: flex;
          justify-content: flex-end;
        `}
        > div {
          margin: 0;
          padding: 0;
          border-bottom-left-radius: 1.25rem;
          border-bottom-right-radius: 1.25rem;
          width: 14.75rem;
          padding-top: 1.25rem;
          ${media.smallScreen`
            &.select-input + div {
              margin-right: 1rem;
              width: 12.875rem;
            }
          `}
          ${mediaUp.largeScreen`
            margin-top: -1.25rem;
          `}
        }
      }
    }
  }
`;

export const FiltersChipsWrapper = styled.div`
  margin-top: 0.5rem;
  padding: 0rem 0.5rem;
  > div {
    margin: 0.4rem;
  }
  display: none;
`;

export const NumberProducts = styled.span`
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
`;
