import { mediaUp, styled } from '@styles';

export const Paragraph = styled.p`
  font-size: 1.563rem;
  font-weight: 400;
  ${mediaUp.mediumScreen`
    font-size: 1.125rem;
  `}
`;

export const Wrapper = styled.p`
  font-size: 1.563rem;
  font-weight: 600;
`;
export const WrapperMobile = styled.p`
  font-size: 1.563rem;
  font-weight: 600;
  margin-left: 0.313rem;
`;
