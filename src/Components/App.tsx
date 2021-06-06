import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar } from "./Apollo";
import AppRouter from "./AppRouter";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, light, dark } from "../styles/styles";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? dark : light}>
          <GlobalStyles />
          <AppRouter />
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
