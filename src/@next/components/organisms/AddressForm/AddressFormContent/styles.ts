import { styled } from '@styles';

export const Map = styled.div`
  width: 100%;
  height: 21.25rem;
`;

export const MapHint = styled.div`
  background-color: ${({ theme }) => theme.colors.complementary1};
  font-size: ${({ theme }) => theme.typography.smallFontSize};
  font-weight: ${({ theme }) => theme.typography.boldFontWeight};
  height: 3rem;
  padding: 1rem;
`;
