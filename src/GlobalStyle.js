// src/styles/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: black;
    color: white;
    font-family: 'Copperplate', 'Bank Gothic', 'Impact', sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;