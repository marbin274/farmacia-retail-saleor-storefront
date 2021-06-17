import { mediaUp, styled } from "@styles";
import { white } from "@temp/@next/globalStyles/constants";

export const Wrapper = styled.div`
  background-color: ${white};
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
  height: 100%;
  width: 20rem;
  padding: 100px 32px 0 60px;
  ${mediaUp.smallScreen`
    width: 20rem;
    padding: 100px 32px 0 60px;
  `}
`;
export const Header = styled.div`
  align-items: center;
  display: flex;
  font-weight: ${props => props.theme.typography.normalFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};  
  justify-content: space-between;  
  padding: 0;  
  width: 100%;
  margin-bottom:44px;
  > div {
    background-color: ${props => props.theme.colors.complementary1};
  }
  > span {
    color: #2F2C3A;
    font-size:32px;
    font-weight:600;
    
  }
`;

export const SubWrapper = styled.div`
  height: calc(100% - 3.25rem);
  width: 100%;
`;

export const Body = styled.div`
  height: calc(90% - 5.174rem);
  padding: 1rem 1rem 0rem 0;
  overflow: auto;
`;

export const Footer = styled.div` 
  background: ${white};
  height: auto;
  padding: 0;
  position: relative;
  text-align: left;
  width: 100%;
  ${mediaUp.mediumScreen`
    display:block ;
  `}
`
