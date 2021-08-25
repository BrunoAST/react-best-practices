import React from "react";
import ReactDOM from "react-dom";
import "../theme/styles/global.scss";
import Router from "../presentation/components/Router/Router";
import {makeLogin} from "./factories/pages/login/login-factory";
import {makeSignUp} from "./factories/pages/signup/signup-factory";

ReactDOM.render(
    <Router
        makeLogin={makeLogin}
        makeSignUp={makeSignUp}
    />,
    document.getElementById("main")
);
