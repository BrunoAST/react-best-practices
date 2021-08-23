import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ROUTES} from "./constants/routes.const";
import SignUp from "../../pages/SignUp/SignUp";
import {RouterProps} from "./types/router-props";

const Router: React.FC<RouterProps> = ({makeLogin}: RouterProps) => {
    return (
      <BrowserRouter>
          <Switch>
              <Route path={ROUTES.LOGIN} exact component={makeLogin}/>
              <Route path={ROUTES.SIGNUP} exact component={SignUp}/>
          </Switch>
      </BrowserRouter>
    );
}

export default Router;
