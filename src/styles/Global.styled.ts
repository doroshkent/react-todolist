import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.2;
    min-width: 360px;
  }

  ul {
    list-style: none;
  }
  
  a {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
  
  button {
    border: unset;
    background-color: unset;
    cursor: pointer;
  }
  
  p {
    font-size: 18px;
    font-weight: 400;
  }
`
