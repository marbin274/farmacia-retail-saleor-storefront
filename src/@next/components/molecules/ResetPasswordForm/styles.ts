import { styled } from "@styles";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  background: #F7F6F8;

  h3 {
    font-weight: ${props => props.theme.typography.boldFontWeight};
    text-transform: uppercase;
  }
`;

export const GeneralError = styled.p`
  color: ${props => props.theme.colors.aunaError} !important;
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 9rem;
  margin: 1rem auto;
`;
