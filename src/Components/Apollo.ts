import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "token";
const DARKMODE = "DARKMODE";

//setContext는 클라이언트의 모든 Requestdp 항목을 추가할수있게 해준다.
//참고문서 : https://www.apollographql.com/docs/react/networking/advanced-http-networking/#gatsby-focus-wrapper
//참고문서 : https://www.apollographql.com/docs/react/api/link/apollo-link-context/#overview
//setContext의 첫번째인자는 GraphQL요청(현재는 사용x)
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
  cache: new InMemoryCache(),
  //authLink와 httlLink를 하나로 묶는다.
  link: authLink.concat(httpLink),
});

//isLoggedInVar
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
//login
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
