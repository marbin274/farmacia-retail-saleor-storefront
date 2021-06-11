import { media, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between ;
  flex-direction: row-reverse;
  margin-bottom: 3.125rem;
`;

export const PageControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  
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
  color: #23212B;
  ${media.smallScreen`
    display: block;
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
  width:7.5rem;
  height:2rem;
  color: ${farmatheme.theme.colors.white};
  background-color:${farmatheme.theme.colors.interactive};
  border-radius: 2.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:0.875rem;
`;

export const PageButtonIcon = styled.img<{ leftSide?: boolean }>`
  display: inline-block;
  width: 1.25rem;
  margin-left: ${props => (props.leftSide ? 0 : "0.25rem")};
  margin-right: ${props => (props.leftSide ? "0.25rem" : 0)};
`;
