import { styled, media } from "@styles";

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${props => props.theme.modal.modalWidthMedium};
  ${media.smallScreen`
    width: 88%;
  `}
  max-width: 100%;
  max-height: 98%;
  z-index: 1000;
  padding-bottom: 2rem;
  overflow-y: auto;
  background-color: ${props => props.theme.colors.white};
  margin-left: auto;
  margin-right: auto;
  border-radius: 1rem;
`;

export const Content = styled.div`
  padding: ${({ theme: { spacing } }) =>
    `0rem ${spacing.gutter} 0rem ${spacing.gutter}`};
`;
