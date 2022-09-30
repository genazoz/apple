import {createGlobalStyle} from "styled-components";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 16px;
    font-family: ${theme.fonts.openSans}, Impact, Serif;
    background: ${theme.html.background};
  }

  .flexCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .fullpage-wrapper {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: white;
  }

  a, p {
    font-family: ${theme.fonts.openSans};
    font-size: ${theme.fontSize};

    @media (max-width: ${theme.media.xs}) {
      font-size: 15px;
    }
  }

  li {
    list-style-type: none;
  }

  input, button {
    outline: none;
    font-family: ${theme.fonts.openSans};
  }
  
  button {
    cursor: pointer;
    background-color: transparent;
    border: unset;
  }

  \:root {
    --unit: calc((100vw - 1210px) / 2);
    @media (max-width: ${theme.media.xl}) {
      --unit: 85px;
    }
    @media (max-width: ${theme.media.lg}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.md}) {
      --unit: 64px;
    }
    @media (max-width: ${theme.media.sm}) {
      --unit: 32px;
    }
    @media (max-width: ${theme.media.xs}) {
      --unit: 24px;
    }
  }

  h1, h2, h3, h4 {
    font-weight: normal;
  }
`;

export default GlobalStyles;