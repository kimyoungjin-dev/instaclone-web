import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const dark: DefaultTheme = {
  bgColor: "black",
  fontColor: "white",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const light: DefaultTheme = {
  bgColor: "white",
  fontColor: "black",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};

    input{
      all:unset;
    }


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
        font-size:14px;
        background-color:#FAFAFA;
        color:rgb(38,38,38);
    }
    
   
`;
