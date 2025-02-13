import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
      transition: all 0.3s ease-in-out;
  }

  input {
      max-width: 200px;
      width: 100%;
      padding: 10px;
      margin: 10px;
      letter-spacing: 2px;
      box-sizing: border-box; /* Ensure proper sizing */
  }

  select {
      max-width: 200px;
      width: 100%;
      padding: 10px;
      margin: 5px;
      letter-spacing: 2px;
      box-sizing: border-box; /* To match dimensions accurately */
  }

  option {
      width: 100%;
      margin: 5px;
      padding: 10px;
  }`;
