import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {ROUTES} from "./routes.const";
import SignUp from "../../pages/SignUp/SignUp";

type Props = {
    makeLogin: React.FC;
}

const Router: React.FC<Props> = ({makeLogin}: Props) => {
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
