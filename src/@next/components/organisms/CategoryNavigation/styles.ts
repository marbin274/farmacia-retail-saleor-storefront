import { media, styled } from "@styles";
import { aunaGrey60 } from "@styles/constants";

export const Wrapper = styled.nav`
  width: 300px;
  border-right: 1px solid ${aunaGrey60};

  ${media.largeScreen`
    display: none;
  `}
`;

export const Title = styled.p`
  margin-bottom: 48px;
  font-weight: 600;
  font-size: 18px;
`;

export const List = styled.ul`
  margin: 0 12px;
`;

export const Link = styled.li`
  margin-bottom: 32px;
  font-weight: normal;
  font-size: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
