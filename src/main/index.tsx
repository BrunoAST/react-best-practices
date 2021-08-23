import React from "react";
import ReactDOM from "react-dom";
import "../theme/styles/global.scss";
import Router from "../presentation/components/Router/Router";
import {makeLogin} from "./factories/pages/login/login-factory";

ReactDOM.render(
    <Router
        makeLogin={makeLogin}
    />,
    document.getElementById("main")
);
