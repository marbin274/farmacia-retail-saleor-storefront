import { styled } from '@styles';
import { ReactSVG } from 'react-svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #f7f6f8;
`;

export const GeneralError = styled.p`
  color: ${(props) => props.theme.colors.aunaError} !important;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10.5rem;
  margin: 1rem auto;
`;

export const ResetPasswordChangedIcon = styled(ReactSVG)`
  svg {
    margin: auto;
  }
`;
