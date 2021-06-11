import { styled, media } from "@styles";

export const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  padding: 0 1rem;
  height:2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 1.625rem;
  border: 1px solid #908BA7
  border-radius: 2.5rem; 
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem;
  height: auto;
  overflow: visible;
  z-index: 10;
  background-color: white;
  border-radius:1.25rem;
  border: 0.063rem solid #C8C5D3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
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
  padding: 0 1.25rem;
  align-items: center;
  height: 2.5rem;
  border-radius:1.25rem;
  color: ${props => (props.active ? props.theme.colors.activeMenuOption : "")};
  background-color: ${props => (props.active ? '#E8FCF7' : "")};

  svg {
    transform: rotate(-90deg);
    ${media.smallScreen`
      display: none;
  `}
  }
`;