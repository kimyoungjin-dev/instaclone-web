import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARKMODE = "DARKMODE";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

//logOut
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

//darkmode
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARKMODE)));

export const darkModeClick = () => {
  localStorage.setItem(DARKMODE, "DARKMODE");
  darkModeVar(true);
};
export const whiteModeClick = () => {
  localStorage.removeItem(DARKMODE);
  darkModeVar(false);
};
