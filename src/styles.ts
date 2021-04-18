import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const dark: DefaultTheme = {
  bgColor: "black",
  fontColor: "white",
};

export const light: DefaultTheme = {
  bgColor: "white",
  fontColor: "black",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};

    *{
        box-sizing:border-box;
        padding:0;
        margin:0;
    }

    a{
        text-decoration:none;
        color:inherit;
    }
    
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    input{
        all:unset;
    }
`;
