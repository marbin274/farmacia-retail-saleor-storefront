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
  > span {
    color: ${({ isDefault, theme }) => isDefault ? theme.colors.interactive : theme.colors.aunaBlack};
    font-size: ${({theme})=>theme.typography.smallFontSize};
    font-weight:${({ isDefault, theme }) => isDefault ? theme.typography.boldFontWeight : theme.typography.normalFontWeight};
    line-height: 1.5rem;
    opacity: ${({ isDefault }) => isDefault ? "initial":"0.6"};
    padding-left: 0.5rem;
  }
`;
export const SelectIcon = styled.div`
  background: ${({theme})=>theme.colors.white};
  border-radius: 5px;
  height: 24px;
  position: relative;
  text-align: center;
  width: 24px;
  > div {
    text-align: center;
    margin-top: 4px;
  }
`
export const FooterContent = styled.div`
  > div {
    display: inline-block;
    padding: 0;
    margin: 0;
    margin-right: 0.6rem;
  }
`;

export const MenuItem = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  :hover {
    background-color: ${props => props.theme.colors.primaryLight};
  }
`;
