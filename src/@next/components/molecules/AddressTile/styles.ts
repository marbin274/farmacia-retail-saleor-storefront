import { styled } from "@styles";

export const Wrapper = styled.div`
  height: 100%;
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const HeaderContent = styled.div`
  color: ${props => props.theme.colors.lightFont};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SelectDefaultAddress = styled.div<{isDefault?:boolean}>`
  display: flex;
  cursor: pointer;
  align-items: center;
`;

export const MenuItem = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
