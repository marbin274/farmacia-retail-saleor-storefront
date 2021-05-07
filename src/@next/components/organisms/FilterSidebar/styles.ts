import { mediaUp, styled } from "@styles";
import { white } from "@temp/@next/globalStyles/constants";

export const Wrapper = styled.div`
  background-color: ${white};
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
  height: 100%;
  width: 100vw;
  ${mediaUp.smallScreen`
    width: 25.625rem;
  `}
`;
export const Header = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${props => props.theme.typography.normalFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};  
  justify-content: space-between;  
  padding: 1rem 1rem 0rem 0.5rem;  
  width: 100%;
  > div {
    background-color: ${props => props.theme.colors.complementary1};
  }
`;

export const SubWrapper = styled.div`
  height: calc(100% - 3.25rem);
  width: 100%;
`;

export const Body = styled.div`
  height: calc(100% - 5.174rem);
  padding: 1rem 1rem 0rem 1rem;
  overflow: auto;
`;

export const Footer = styled.div` 
  background: ${white};
  height: 5.174rem;
  padding: 1rem;
  position: relative;
  text-align: center;
  width: 100%;
  ${mediaUp.mediumScreen`
    display: none;
  `}
`
