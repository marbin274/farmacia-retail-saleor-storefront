import { ContainerStyle, mediaUp, styled } from '@styles';

export const Wrapper = styled.div`
  align-items: center;
  background: #f7f6f8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  h3 {
    font-weight: ${(props) => props.theme.typography.boldFontWeight};
    text-transform: uppercase;
  }
  ${ContainerStyle}
`;

export const NewPasswordForm = styled.div`
  ${mediaUp.mediumScreen`
    width: 46rem;
  `}
`;

export const GeneralError = styled.p`
  color: ${(props) => props.theme.colors.aunaError} !important;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  height: 9rem;
  justify-content: space-between;
  margin: 1rem auto;
`;
