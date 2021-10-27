import { createGlobalStyle } from 'styled-components';
import { palette } from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    width: 100%;
    margin: 0;

    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: ${palette.text};
    background: ${palette.backgroundPrimary};

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    a {
      color: ${palette.text};

      &:hover {
        color: ${palette.text};
      }

      &[target='_blank'] {
        text-decoration: underline;
      }
    }

    html,
    body,
    body > div:first-child,
    div#__next,
    div#__next > div,
    div#__next > div > div,
    main {
      min-height: 100%;
    }

    .row-clickable {
      cursor: pointer;
    }
  }
`;
