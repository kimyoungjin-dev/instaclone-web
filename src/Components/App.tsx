import { useReactiveVar } from "@apollo/client";
import { darkModeVar, isLoggedInVar } from "./Apollo";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "styled-components";
import { dark, GlobalStyles, light } from "../styles";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? dark : light}>
        <GlobalStyles />
        <AppRouter isLoggedIn={isLoggedIn} />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
