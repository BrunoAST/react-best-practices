import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants/routes.const";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";
import { makeSurveyList } from "../factories/pages/survey-list/survey-list-factory";
import ApiContext from "../../presentation/context/api/api-context";
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from "../adapters/current-account-adapter";
import PrivateRoute from "../../presentation/components/PrivateRoute/PrivateRoute";

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={ROUTES.SURVEY_LIST} exact component={makeSurveyList}/>
          <Route path={ROUTES.LOGIN} exact component={makeLogin}/>
          <Route path={ROUTES.SIGNUP} exact component={makeSignUp}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

export default Router;
