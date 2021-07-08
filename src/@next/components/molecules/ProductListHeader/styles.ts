import farmatheme from "@farmatheme";
import { mediaUp, styled } from "@styles";

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
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 100%;

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

export const Element = styled.span`
  display: flex;

  ${mediaUp.xSmallScreen`
    margin-top: 0;
  `}
  ${mediaUp.mediumScreen`
    margin-top: 0;
  `}
`;

export const CustomSelectContainer = styled.div`
  .select-input {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0;
    width: 100%;
    ${mediaUp.smallScreen`
      justify-content: flex-end;
    `}
    .label {
      color: ${farmatheme.theme.colors.neutral.darkest};
    }    
  }

  .select-container { 
    align-items: center;
    background: #FFFFFF;
    border: 0.0625rem solid #908BA7;
    border-radius: 2.5rem;
    cursor: pointer;
    display:flex;
    height: 2.5rem;
    justify-content: flex-start;
    justify-content: space-between;
    position:relative;
    z-index: 2; 
  }

  div[class*="menu"] {
    border-bottom-left-radius: 1.25rem;
    border-bottom-right-radius: 1.25rem;
    margin-top: -1.25rem;
    padding-top: 1.25rem;
  }
  .dropdown-select {
    > div {
      margin: 0;
      padding: 0;
    }
    .select-control {
      display: flex;
      justify-content: flex-end;
      margin: 0;
      padding: 0;
      ${mediaUp.smallScreen`
        display: block;
        justify-content: initial;
      `}
    }
  }
`;

export const Filters = styled(CustomSelectContainer as any)`
  display: flex;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  > span {
    margin-left: 0.5rem;
  }
`;

export const CategoryFilter = styled(CustomSelectContainer as any)`  
  .select-input{
    .select-container {
      justify-content: space-between;
      display: flex;
      width: 100%;
    }
  }
  
`;

export const Label = styled.span`
  color: ${farmatheme.theme.colors.neutral.dark};
  font-weight: 400;
  padding: 0 0.625rem;
`;

export const Sort = styled.div`
  display: inline-block;
  width: inherit;

  .label {
    display: block;
  }

  > div {
    > div {
      padding: 0rem;
      .select-input{
        margin: 0;
        padding: 0;
      }
      div[class*="-menu"]{
        margin: 0;
        padding: 0;
      }
    }
  }
`;

export const FiltersChipsWrapper = styled.div<{
  hasFilters: boolean;
}>`
  align-items: center;
  align-self: flex-start;
  display: flex;
  flex-wrap: wrap;
  margin-top: ${({ hasFilters }) => (hasFilters ? "0.5rem" : 0)};
  > span {
    margin: ${({ hasFilters }) => (hasFilters ? "0.4rem" : 0)};
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const NumberProducts = styled.span`
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
`;

export const MobileLabel = styled.div`
  ${mediaUp.mediumScreen`
    display: none;
  `}
`;
