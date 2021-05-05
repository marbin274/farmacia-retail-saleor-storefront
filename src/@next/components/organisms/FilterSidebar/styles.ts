import { mediaUp, styled } from "@styles";
import { white } from "@temp/@next/globalStyles/constants";

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${white};
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
  width: 100vw;
  ${mediaUp.smallScreen`
    width: 25.625rem;
  `}
`;
export const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  padding: 0;

  font-weight: ${props => props.theme.typography.normalFontWeight};
  font-size: ${props => props.theme.typography.h4FontSize};
  > div {
    background-color: ${props => props.theme.colors.complementary1};
  }
`;

export const ButtonContainer = styled.div`
  bottom: 2rem;
  position: absolute;
  text-align: center;
  width: 100%;
  ${mediaUp.mediumScreen`
    display: none;
  `}
`
