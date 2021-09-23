import { styled, media, CustomSelectContainer } from '@styles';

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
      padding: 0.75rem 1rem;
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
