import { styled } from '@styles';

export const Wrapper = styled.div`
  width: 80%;
  > div {
    margin-left: initial;
  }
`;

export const Header = styled.div`
  font-size: ${(props) => props.theme.typography.h4FontSize};
  font-weight: ${(props) => props.theme.typography.boldFontWeight};
  padding-bottom: 1.5rem;
  display: none;
`;

export const BottomBorder = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  width: 95%;
`;

export const ViewMoreButton = styled.div`
  padding: 3.125rem 0 1.25rem 0;
  span {
    color: ${(props) => props.theme.colors.interactive};
    font-size: ${(props) => props.theme.typography.smallFontSize};
    font-weight: ${(props) => props.theme.typography.normalFontWeight};
    margin-left: 0.5rem;
  }
`;
