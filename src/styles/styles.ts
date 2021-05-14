import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const light: DefaultTheme = {
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  loginBtnColor: "rgb(69,166,246)",
  borderColor: "rgb(219,219,219)",
  silverColor: "silver",
};

export const dark: DefaultTheme = {
  bgColor: "rgb(38,38,38)",
  fontColor: "#FAFAFA",
  loginBtnColor: "rgb(69,166,246)",
  borderColor: "rgb(219,219,219)",
  silverColor: "silver",
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
        background-color:${(props) => props.theme.bgColor};
        color:${(props) => props.theme.fontColor};
    }
    
   
`;
