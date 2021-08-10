import { styled } from "@styles";
import farmatheme from "@farmatheme";

export const Wrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background: rgba(35, 33, 43, 0.8);
  left: 0;
  a {
    text-transform: capitalize;
    span {
      text-transform: capitalize;
    }
  }
`;

export const Overlay = styled.div`
  display: flex;
  height: max-content;
  width: 71.25rem;
  max-width: 100%;
  margin: 0 auto;
`;

export const lvl1List = styled.ul`
  background-color: ${farmatheme.theme.colors.highlight.lightest};
  border-bottom-left-radius: 2rem;
  box-shadow: -0.25rem 0rem 0.313rem rgb(0 0 0 / 12%);
  height: max-content;
  width: 17rem;
  min-width: 17rem;
  padding: 1rem 0rem 0rem;
  position: relative;
  z-index: 2;
  li {
    :hover {
      background-color: ${farmatheme.theme.colors.neutral.lightest};
      > a {
        color: ${farmatheme.theme.colors.highlight.medium};
      }
    }
    > a:focus,
    a:hover {
      color: ${farmatheme.theme.colors.highlight.medium};
    }
    :last-child {
      border-bottom-left-radius: 1rem;
    }
    > a {
      color: ${farmatheme.theme.colors.highlight.darkest};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.5rem;
      font-size: ${({ theme }) => theme.typography.labelFontSize};
      font-weight: 500;
      width: 100%;
    }
    > svg {
      cursor: pointer;
    }
  }
`;

export const OverlayNavItems = styled.div`
  background-color: ${farmatheme.theme.colors.neutral.lightest};
  border-bottom-left-radius: 0.625rem;
  border-bottom-right-radius: 0.625rem;
  box-shadow: 0rem 0.0625rem 0.875rem rgb(0 0 0 / 50%);
  height: max-content;
  padding: 2rem 2rem 2rem 0.5rem;
  position: relative;
  width: 100%;
  z-index: 1;
`;

export const OverlayNavItemTitle = styled.div`
  align-items: center;
  display: flex;
  padding-bottom: 1rem;
  padding-left: 1rem;
  > h4 {
    font-weight: ${({ theme }) => theme.typography.boldFontWeight};
    text-transform: capitalize;
  }
  button {
    margin-left: 1rem;
    padding: 0.2rem 1rem;
    > span {
      font-size: 0.875rem;
    }
  }
`;

export const lvl2List = styled.ul`
  a {
    :hover {
      color: ${farmatheme.theme.colors.brand["01"]};
    }
  }
  display: flex;
  flex-wrap: wrap;
  > li {
    padding: 1rem 0rem;
    width: 25%;
    > div {
      padding-left: 1rem;
      > a {
        font-size: ${({ theme }) => theme.typography.smallFontSize};
      }
    }
  }
`;

export const lvl3List = styled.ul`
  margin-top: 1rem;
  li {
    a {
      font-size: ${({ theme }) => theme.typography.labelFontSize};
      font-weight: normal;
      padding: 0.5rem 0rem 0.5rem 1rem;
      :hover {
        background-color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
