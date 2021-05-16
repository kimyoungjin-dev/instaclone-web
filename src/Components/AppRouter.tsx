import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotFound from "../Screens/NotFound";
import Profile from "../Screens/Profile";
import SignUp from "../Screens/SignUp";
import { isLoggedInVar } from "./Apollo";
import HeaderLayOut from "./Header/HeaderLayOut";

export default function AppRouter() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home}>
          {isLoggedIn ? (
            <HeaderLayOut>
              <Home />
            </HeaderLayOut>
          ) : (
            <HeaderLayOut>
              <Login />
            </HeaderLayOut>
          )}
        </Route>

        {!isLoggedIn ? (
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
        ) : null}

        {isLoggedIn ? (
          <Route path={`/users/:username`}>
            <HeaderLayOut>
              <Profile />
            </HeaderLayOut>
          </Route>
        ) : (
          <Route path={routes.home}>
            <HeaderLayOut>
              <Home />
            </HeaderLayOut>
          </Route>
        )}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
