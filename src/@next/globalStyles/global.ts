import { createGlobalStyle } from 'styled-components';
import { DefaultTheme, media } from '.';
import { aunaDiscount, aunaGrey80, gray } from './constants';

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: ${(props) => props.theme.typography.baseFontFamily} !important;
  }

  body {
    margin: 0;
    min-width: 20rem;
    color: ${(props) => props.theme.colors.aunaBlack};
  }

  input, textarea, button {
    font-family: inherit;
  }

  h1 {
    font-size: ${(props) => props.theme.typography.h1FontSize};
    line-height: ${(props) => props.theme.typography.h1LineHeight};

    ${(props) => media.smallScreen`
      font-size: ${props.theme.typography.h2FontSize};
    `}
  }

  h3 {
    font-size: ${(props) => props.theme.typography.h3FontSize};
    line-height: 1.7rem;
  }

  h4 {
    font-size: ${(props) => props.theme.typography.h4FontSize};
  }

  a {
    text-decoration: none;
    font-weight: normal;
    color: inherit;
  }

  p {
    line-height: 1.5rem;
  }

  button {
    background-color: transparent;
    cursor: pointer;
    outline: none;
    padding: 0;
  }

  ul {
    list-style: none;
  }
  
  hr {
    border: 0.0625rem solid ${aunaGrey80};
    border-top: none;
  }

  table {
    width: 100%;
    margin: 3rem 0;
    font-size: 0.875rem;

    th {
      color: ${gray};
      text-align: left;
      padding: 1rem 0.5rem;
    }

    tr {
      color: ${(props) => props.theme.colors.aunaBlack};
      border-bottom: 1px solid ${aunaDiscount};
    }

    td {
      padding: 1rem 0.5rem;
      vertical-align: middle;

      img {
        vertical-align: middle;
        margin-right: 1rem;
      }
    }
  }

  #root {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    & > div:first-of-type {
      flex: 1;
    }
  }
`;
