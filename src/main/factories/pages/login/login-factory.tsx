import React from "react";
import Login from "../../../../presentation/pages/Login/Login";
import { makeRemoteAuthentication } from "../../usecases/authentication/remote-authentication-factory";
import { makeLoginValidation } from "./login-validation-factory";
import { makeLocalUpdateCurrentAccount } from "../../usecases/update-current-account/local-update-current-account-factory";

export const makeLogin: React.FC = () => {
    return (
        <Login
            authentication={makeRemoteAuthentication()}
            validation={makeLoginValidation()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    );
}
