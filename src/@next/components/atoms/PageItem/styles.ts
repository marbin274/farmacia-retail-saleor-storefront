import { styled } from "@styles";

export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  color: ${({ selected, theme }) =>
    selected ? "white" : theme.colors.interactive};
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.interactive : "white"};
  cursor: pointer;
`;
