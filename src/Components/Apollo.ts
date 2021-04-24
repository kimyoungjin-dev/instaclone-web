import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
const DARKMODE = "DARKMODE";

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// //login
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

//logOut
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
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
