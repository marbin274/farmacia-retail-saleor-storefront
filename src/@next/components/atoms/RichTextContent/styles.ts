import { styled } from '@styles';
import farmatheme from '@farmatheme';

export const Wrapper = styled.div`
  width: 100% !important;
  text-align: justify;

  strong {
    font-weight: 600;
    color: ${farmatheme.theme.colors.black};
  }

  p:empty {
    margin-top: 0rem;
  }

  em {
    font-style: italic;
  }

  p {
    margin-top: 1rem;
  }

  ul {
    padding-left: 2.5rem;
    margin-top: 0.7rem;
    font-weight: 400;
    li {
      list-style-type: initial;
      font-weight: 400;
    }
  }

  ol {
    padding-left: 2.5rem;
    margin-top: 0.7rem;
    font-weight: 400;
    li {
      list-style-type: decimal;
    }
  }

  h1 {
    font-size: 2rem !important;
  }

  h2 {
    font-size: 1.5rem !important;
  }

  h3 {
    font-size: 1.17rem !important;
  }

  blockquote {
    border-left: 0.125rem solid ${farmatheme.theme.colors.gray['04']};
    margin: 0;
    padding: 0.5rem 1rem;
  }
`;
