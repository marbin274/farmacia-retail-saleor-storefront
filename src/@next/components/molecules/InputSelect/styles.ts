import { styled } from "@styles";

export const Wrapper = styled.div``;

export const DropdownIndicator = styled.div<{withArrow: boolean}>`
  fill: ${props => props.theme.input.textColor};
  position: absolute;
  right: 0.75rem;
  transform: rotate(180deg);
  ${(props) => props.withArrow ? 'top: 0.5rem' : ''}
`;

export const ClearIndicator = styled.div`
  position: absolute;
  right: 1rem;
`;
