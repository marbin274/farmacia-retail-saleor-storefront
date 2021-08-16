import { styled } from "@styles";

export const Wrapper = styled.div``;

export const Description = styled.div`
  font-size: ${props => props.theme.typography.smallFontSize};
  color: ${props => props.theme.colors.lightFont};
  text-align: center;
  padding-bottom: 0.25rem;
`;

export const Text = styled.div`
  text-align: center;
`;