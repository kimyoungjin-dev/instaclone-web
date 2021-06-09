import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotFound from "../Screens/NotFound";
import SignUp from "../Screens/SignUp";
import { isLoggedInVar } from "./Apollo";
import Hashtag from "./Feed/Hashtag";
import HeaderLayOut from "./Header/HeaderLayOut";
import Profile from "./Profile";

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
            <Login />
          )}
        </Route>

        {!isLoggedIn ? (
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
        ) : (
          <Route path={`${routes.Profile}/:username`}>
            <HeaderLayOut>
              <Profile />
            </HeaderLayOut>
          </Route>
        )}

        <Route path={routes.Hashtag}>
          <Hashtag />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
