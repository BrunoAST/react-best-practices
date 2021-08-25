import React from "react";
import SignUp from "../../../../presentation/pages/SignUp/SignUp";
import {makeSignUpValidation} from "./signup-validation-factory";
import {makeRemoteAddAccount} from "../../usecases/add-account/remote-add-account-factory";
import {makeLocalSaveAccessToken} from "../../usecases/save-access-token/local-save-access-token-factory";

export const makeSignUp: React.FC = () => {
    return (
        <SignUp
            validation={makeSignUpValidation()}
            addAccount={makeRemoteAddAccount()}
            saveAccessToken={makeLocalSaveAccessToken()}
        />
    );
}
