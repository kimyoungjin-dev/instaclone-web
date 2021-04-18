import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../Screens/Home";
import Login from "../Screens/Login";
import NotFound from "../Screens/NotFound";

interface IProps {
  isLoggedIn: Boolean;
}

const AppRouter: React.FC<IProps> = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Login />}
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
