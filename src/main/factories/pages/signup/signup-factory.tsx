import React from "react";
import SignUp from "../../../../presentation/pages/SignUp/SignUp";
import {makeSignUpValidation} from "./signup-validation-factory";
import {makeRemoteAddAccount} from "../../usecases/add-account/remote-add-account-factory";
import {makeLocalUpdateCurrentAccount} from "../../usecases/update-current-account/local-update-current-account-factory";

export const makeSignUp: React.FC = () => {
    return (
        <SignUp
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
            updateCurrentAccount={makeLocalUpdateCurrentAccount()}
        />
    );
}
