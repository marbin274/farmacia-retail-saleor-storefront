import { styled } from '@styles';

export const BreadcrumbTitle = styled.span<{ oneItem: boolean }>`
  ${({ oneItem }) => (oneItem ? `width: calc(100% - 4.5rem);` : '')}
`;
