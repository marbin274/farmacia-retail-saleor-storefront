import { styled, media, CustomSelectContainer } from '@styles';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid #908BA7
  border-radius: 2.5rem; 
  height:2.5rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 1rem;
`;

export const Overlay = styled.div`
  background-color: white;
  border-radius: 1.25rem;
  border: 0.063rem solid #c8c5d3;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  height: auto;
  left: 0;
  overflow: visible;
  padding: 1.25rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export const MenuHeader = styled.div`
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  padding-bottom: 2rem;
`;

export const RoutesWrapper = styled(CustomSelectContainer as any)`
  margin-bottom: 1rem;  
  position: relative;
  z-index: 1;
  .select-input {
    .select-container {
      padding: .75rem 1rem
      width: 100%;
    }
  }
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  align-items: center;
  color: ${(props) =>
    props.active ? props.theme.colors.activeMenuOption : ''};
  background-color: ${(props) => (props.active ? '#E8FCF7' : '')};
  border-radius: 1.25rem;
  display: flex;
  height: 2.5rem;
  justify-content: space-between;
  padding: 0 1.25rem;
  svg {
    transform: rotate(-90deg);
    ${media.smallScreen`
      display: none;
  `}
  }
`;
