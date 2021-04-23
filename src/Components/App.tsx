import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./Apollo";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, light } from "../styles/styles";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={light}>
          <GlobalStyles />
          <AppRouter isLoggedIn={isLoggedIn} />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
