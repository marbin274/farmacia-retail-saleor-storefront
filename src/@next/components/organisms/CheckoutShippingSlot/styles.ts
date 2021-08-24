import { styled } from "@styles";

export const FieldsGroup = styled.div`
  padding-top: 1rem;
  padding-bottom: 2rem;
  width: 100%;
`;

export const ShippingMethodContainer = styled.div<{
  isScheduledSelected?: boolean;
  selected: boolean;
  hasError: boolean;
}>`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid
    ${({ hasError, selected, theme }) =>
      hasError
        ? `${theme.colors.aunaError}`
        : !!selected
        ? `${theme.colors.interactive}`
        : theme.colors.backgroundLight};
  flex-direction: row;
  cursor: pointer;
  display: flex;
  margin: 1rem 0rem;
  box-shadow: 1px 1px 9px 2px #ddd;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 6px 2px #ccc;
  }
`;

export const ShippingMethodItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
