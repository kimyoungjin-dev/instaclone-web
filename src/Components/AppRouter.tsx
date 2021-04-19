import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../routes";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotFound from "../Screens/NotFound";
import SignUp from "../Screens/SignUp";

interface IProps {
  isLoggedIn: Boolean;
}

const AppRouter: React.FC<IProps> = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.home}>
          {isLoggedIn ? <Home /> : <Login />}
        </Route>

        {!isLoggedIn ? (
          <Route path={routes.signUp}>
            <SignUp />
          </Route>
        ) : null}

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
