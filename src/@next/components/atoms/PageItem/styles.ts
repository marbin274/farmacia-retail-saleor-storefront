import { styled } from "@styles";
import farmatheme from "@farmatheme";

export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6.25rem;
  color: ${({ selected }) => (selected ? "white" : "#23212B")};
  background-color: ${({ selected }) => (selected ? farmatheme.theme.colors.interactive : "white")};
  border: ${({ selected }) => (selected ? "" : `1px solid ${farmatheme.theme.colors.interactive}`)};
  cursor: pointer;
`;
