import { media, styled } from "@styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PageControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const PageItems = styled.div`
  display: block;
  display: flex;
  flex-direction: row;
  align-items: center;

  > div {
    margin-right: 1rem;
  }

  > div:first-child {
    margin-left: 1rem;
  }

  ${media.smallScreen`
    display: none;
  `}
`;

export const PageInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.greyText};
  ${media.smallScreen`
    display: none;
  `}
`;

export const PageInfoMobile = styled.div`
  display: none;
  margin-right: 1.5rem;
  margin-left: 1.5rem;

  span:first-child {
    font-weight: bold;
    margin-right: 1px;
  }

  span:last-child {
    margin-left: 1px;
  }

  ${media.smallScreen`
    display: flex;
  `}
`;

export const PageButton = styled.div`
  padding: 0.625rem 1rem;
  color: ${({ theme }) => theme.colors.interactive};
  background-color: white;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageButtonIcon = styled.img<{ leftSide?: boolean }>`
  display: inline-block;
  width: 1.25rem;
  margin-left: ${props => (props.leftSide ? 0 : "0.25rem")};
  margin-right: ${props => (props.leftSide ? "0.25rem" : 0)};
`;
