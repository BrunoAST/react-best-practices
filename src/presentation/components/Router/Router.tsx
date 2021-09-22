import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ROUTES} from "./constants/routes.const";
import {Factory} from "./types/factory";
import SurveyList from "../../pages/SurveyList/SurveyList";

const Router: React.FC<Factory> = (factory: Factory) => {
    return (
      <BrowserRouter>
          <Switch>
              <Route path={ROUTES.SURVEY_LIST} exact component={SurveyList}/>
              <Route path={ROUTES.LOGIN} exact component={factory.makeLogin}/>
              <Route path={ROUTES.SIGNUP} exact component={factory.makeSignUp}/>
          </Switch>
      </BrowserRouter>
    );
}

export default Router;
