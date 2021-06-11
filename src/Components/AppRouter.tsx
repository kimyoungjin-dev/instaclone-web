import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotFound from "../Screens/NotFound";
import SignUp from "../Screens/SignUp";
import { isLoggedInVar } from "./Apollo";
import HeaderLayOut from "./Header/HeaderLayOut";
import Profile from "../Screens/Profile";
import Hashtags from "../Screens/Hashtags";

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
        ) : null}

        <Route path={`${routes.Profile}/:username`}>
          <HeaderLayOut>
            <Profile />
          </HeaderLayOut>
        </Route>

        <Route path={`${routes.Hashtags}/:hashtag`}>
          <HeaderLayOut>
            <Hashtags />
          </HeaderLayOut>
        </Route>

        <Route path={routes.NotFound} component={NotFound}>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
