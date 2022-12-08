import { createGlobalStyle, css } from 'styled-components';
import RobotoRegularWoff2 from './fonts/roboto-regular.woff2';
import RobotoRegularWoff from './fonts/roboto-regular.woff';
import RobotoMediumWoff2 from './fonts/roboto-medium.woff2';
import RobotoMediumWoff from './fonts/roboto-medium.woff';
import normalize from 'styled-normalize';

export default createGlobalStyle`
  ${normalize};

  @font-face {
    font-style: normal;
    font-weight: 400;
    font-family: "Roboto";
    font-display: swap;
    src:
      url(${RobotoRegularWoff2}) format("woff2"),
      url(${RobotoRegularWoff}) format("woff");
  }

  @font-face {
    font-style: normal;
    font-weight: 500;
    font-family: "Roboto";
    font-display: swap;
    src:
      url(${RobotoMediumWoff2}) format("woff2"),
      url(${RobotoMediumWoff}) format("woff");
  }

  :root {
    --color-text-main: #333333;
    --color-bg-header-main: #f2f2f2;
    --color-bg-active-nav-link: #ffffff;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  html {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.5;
    font-family: "Roboto", Arial, sans-serif;
    color: var(--color-text-main);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    width: 100%;
    height: 100%;

    background-color: var(--alex-blue);
  }

  a {
    color: #000000;
    text-decoration: none;
  }

  img,
  video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  textarea {
    resize: none;
  }

  input:-webkit-autofill {
    box-shadow: inset 0 0 0 1000px $color-default-white;

    -webkit-text-fill-color: $color-default-black;
  }

  // firefox placeholder \ invalid fix + ios bdrs
  input,
  textarea {
    border-radius: 0;

    &::placeholder {
      opacity: 1;
    }

    &:invalid {
      box-shadow: none;
    }
  }

  select {
    border-radius: 0;
  }

  // chrome search X removal
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    appearance: none;
  }

  // input[number] arrows removal
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;

    appearance: none;
  }

  input[type="number"] {
    appearance: textfield;
  }

  // ios button \ inputs reset
  select,
  textarea,
  input:matches([type="email"],
    [type="number"],
    [type="password"],
    [type="search"],
    [type="tel"],
    [type="text"],
    [type="url"]) {
    appearance: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    appearance: none;
  }
`

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`