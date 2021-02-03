import { styled } from "@styles";

export const Modal = styled.div`  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  z-index: 1000;
  padding-bottom: 2rem;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
