import { styled } from "@styles";
import { aunaGrey60 } from "@temp/@next/globalStyles/constants";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
  border: 1px solid ${aunaGrey60};
  border-radius: 0.25rem;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem;
  height: auto;
  /* height: 350px; */
  overflow: visible;
  z-index: 10;
  background-color: white;
  box-shadow: 0 0 0 9999px rgba(50, 50, 50, 0.1);
`;

export const MenuHeader = styled.div`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding-bottom: 2rem;
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  color: ${props => (props.active ? props.theme.colors.activeMenuOption : "")};

  svg {
    transform: rotate(-90deg);
  }
`;
