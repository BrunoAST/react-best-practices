import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ROUTES } from "./constants/routes.const";
import { makeLogin } from "../factories/pages/login/login-factory";
import { makeSignUp } from "../factories/pages/signup/signup-factory";
import ApiContext from "../../presentation/context/api/api-context";
import SurveyList from "../../presentation/pages/SurveyList/SurveyList";
import { setCurrentAccountAdapter } from "../adapters/current-account-adapter";

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path={ROUTES.SURVEY_LIST} exact component={SurveyList}/>
          <Route path={ROUTES.LOGIN} exact component={makeLogin}/>
          <Route path={ROUTES.SIGNUP} exact component={makeSignUp}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  );
}

export default Router;
