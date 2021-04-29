import { media, styled } from "@styles";

export const Content = styled.div`
  width: ${({ theme }) => theme.container.width}px;
  max-width: 100vw;
  height: 526px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.spacer};

  ${media.largeScreen`
    width: 100%;      
  `}
`;

export const Container = styled.div`
  padding: 0 0 3rem;

  h3 {
    font-weight: bold;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  a {
    color: ${({ theme }) => theme.colors.aunaBlack};
    display: inline-block;
    max-width: 255px;
    text-decoration: none;
  }
`;

export const Title = styled.h2`
  font-size: 1.4rem;
  padding: 1rem 0 3rem 0;
`;
