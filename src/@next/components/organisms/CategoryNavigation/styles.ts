import { media, styled } from "@styles";
import { aunaGrey60, white } from "@styles/constants";

export const Wrapper = styled.nav`
  width: 18.75rem;
  background-color: ${white}
  padding: 1.25rem;
  padding-top: 1.875rem;
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
  margin: 0 0.3125rem;
`;

export const Link = styled.li`
  margin-bottom: 0.25rem;
  font-weight: normal;
  font-size: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;
