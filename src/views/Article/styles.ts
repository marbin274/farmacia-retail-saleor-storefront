import { media, mediaUp, styled } from "@styles";
import farmatheme from "@farmatheme";

export const Blog = styled.div`
  .article-page__image {
    margin-bottom: 2.5rem;      
  }
  ${mediaUp.smallScreen`
    .article-page__image {
      padding: 0rem 1rem;
      img {
        border-radius: 2rem;
      }
    }
  `}
`;

export const Header = styled.div`
  min-height: 9.56rem;
  ${media.smallScreen`
    min-height: 5.75rem;
  `}
`;

export const Title = styled.h1`
  ${media.smallScreen`
    padding: 1rem;
    h1 {
      font-size: 1.75rem;
    }
  `}
`;

export const Content = styled.div`
    h1,
    h2,
    h3 {
      font-weight: 600;
      line-height: 2.125rem;
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    img {
      max-width: 100%;
    }

    a {
      color: ${farmatheme.theme.colors.interactive};
    };
`