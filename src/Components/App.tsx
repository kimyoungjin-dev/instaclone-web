import React from "react";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./Apollo";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "styled-components";
import { dark, GlobalStyles, light } from "../styles";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <GlobalStyles />
      <AppRouter isLoggedIn={isLoggedIn} />
    </ThemeProvider>
  );
};

export default App;
