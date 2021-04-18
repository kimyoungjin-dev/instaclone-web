import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ourTheme } from "./styles";

interface IContainerProps {}

const Container = styled.div<IContainerProps>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
`;

const App = () => {
  return <ThemeProvider theme={ourTheme}></ThemeProvider>;
};

export default App;
