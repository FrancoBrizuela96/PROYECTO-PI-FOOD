import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import detailedRecipePage from "../pages/detailedRecipePage/detailedRecipePage";
import landingPage from '../pages/landingPage/landingPage';
import newRecipe from "../pages/newRecipe/newRecipe";
import homePage from "../pages/homePage/homePage";

export const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={landingPage} />
          <Route exact path="/home" component={homePage} />
          <Route path="/recipe/:idRecipe" component={detailedRecipePage} />
          <Route exact path="/newRecipe" component={newRecipe} />
          <Redirect to="/home" />
        </Switch>
      </div>
    </Router>
  );
};
