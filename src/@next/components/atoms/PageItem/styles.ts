import { styled } from "@styles";

// TODO: AGREGAR THEME DE FARMAUNATHEME
export const Container = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6.25rem;
  color: ${({ selected }) => (selected ? "white" : "#23212B")};
  background-color: ${({ selected }) => (selected ? "#452FBA" : "white")};
  border: ${({ selected }) => (selected ? "" : "1px solid #452FBA")};
  cursor: pointer;
`;
