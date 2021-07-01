import { mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto;

  ${mediaUp.largeScreen`
    margin-bottom: 1rem;
    width: 100%;
  `}
`;

export const Bar = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  display: flex;
  font-size: ${props => props.theme.typography.smallFontSize};
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0.5rem 0.5rem 1rem;

  ${mediaUp.largeScreen`
    padding: 1rem 1rem 1rem 1.5rem;
  `}
`;

export const LeftSide = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${mediaUp.mediumScreen`
    justify-content: space-between;
    width: auto;
  `}

  span, button {
    align-items: center;
    color: ${farmatheme.theme.colors.interactive};
    display: flex;
    font-size: ${props => props.theme.typography.smallFontSize};
    font-weight: ${props => props.theme.typography.normalFontWeight};
  }
`;

export const RightSide = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
  font-weight: 600;
  justify-content: space-between;
  width: 100%;

  ${mediaUp.smallScreen`
    font-size: 0.875rem;
  `}

  ${mediaUp.mediumScreen`
    justify-content: flex-end;
  `}
  

  .select-input {
    cursor: pointer;
    justify-content: flex-end;
    .select-container {
      align-items: center;
      display: flex;
    }
    .clear-label {
      align-items: center;
      background: #ffffff;
      border-radius: 2.5rem;
      display: flex;
      height: 2.5rem;
      justify-content: flex-start;
      margin-right: 0;
      padding: 0;
      position: relative;
    }
  }
`;
export const FiltersButton = styled.button`
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const Clear = styled.button`
  color: ${props => props.theme.colors.lightFont};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.theme.typography.smallFontSize};
  padding-left: 2rem;
  > span {
    margin-left: 0.5rem;
  }
  ${mediaUp.mediumScreen`
    padding-left: 0rem;
    width: 7rem;
  `}
`;

export const Element = styled.span`
  display: flex;

  ${mediaUp.mediumScreen`
    margin-top: 0;
  `}
  ${mediaUp.xSmallScreen`
    margin-top: 0;
  `}
`;

export const Filters = styled.span`
  display: flex;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  > span {
    margin-left: 0.5rem;
  }
`;

export const Label = styled.span`
  color: ${farmatheme.theme.colors.neutral.dark};
  padding: 0 0.625rem;
  font-weight: 400;
`;

export const Sort = styled.div`
  display: inline-block;
  width: inherit;

  .label {
    display: block;
  }

  > div {
    margin: 0;
    padding: 0;

    > div {
      margin: 0;
      padding: 0;

      ${mediaUp.mediumScreen`
        padding: 0 0 0 0.625rem;
      `}

      > div {
        margin: 0;
        padding: 0;

        > div {
          margin: 0;
          padding: 0;

          ${mediaUp.mediumScreen`
            padding: 0 0 0 0.625rem;
          `}
        }
      }
    }
  }
`;

export const FiltersChipsWrapper = styled.div<{ hasFilters: boolean }>`
  align-self: flex-start;
  margin-top: ${({ hasFilters }) => (hasFilters ? "0.5rem" : 0)};
  padding: ${({ hasFilters }) => (hasFilters ? "0rem 0.5rem" : 0)};
  > div {
    margin: ${({ hasFilters }) => (hasFilters ? "0.4rem" : 0)};
  }
`;

export const NumberProducts = styled.span`
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
`;
