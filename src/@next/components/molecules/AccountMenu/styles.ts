import { styled } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  height: 100%;
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-sizing: border-box;
  width: 20rem;
  margin-right: 2.5rem;
`;

export const MenuHeader = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-transform: "uppercase";
  padding-bottom: 1.5rem;
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  cursor: pointer;
  padding-bottom: 1.5rem;
  color: ${props => (props.active ? props.theme.colors.activeMenuOption : "")};
  font-size:0.875rem;
  font-weight:500;
`;
