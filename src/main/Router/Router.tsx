import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes.const";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";
import SurveyList from "../../presentation/pages/SurveyList/SurveyList";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={ROUTES.SURVEY_LIST} exact component={SurveyList} />
        <Route path={ROUTES.LOGIN} exact component={makeLogin} />
        <Route path={ROUTES.SIGNUP} exact component={makeSignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
