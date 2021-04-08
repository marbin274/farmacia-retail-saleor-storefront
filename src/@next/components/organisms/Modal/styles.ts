import { defaultTheme, styled } from "@styles";

export const Container = styled.div`
  height: 100vh;
  padding-top: 3rem;
  width: 100%;
  @media (max-width: ${defaultTheme.breakpoints.smallScreen}) {
    padding-top: 0rem;
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 512px;
  max-width: 100%;
  max-height: 98%;
  z-index: 1000;
  padding-bottom: 2rem;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
  margin-left: auto;
  margin-right: auto;
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
