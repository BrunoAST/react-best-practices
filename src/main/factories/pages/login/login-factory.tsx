import React from "react";
import Login from "../../../../presentation/pages/Login/Login";
import {RemoteAuthentication} from "../../../../data/usecases/authentication/remote-authentication";
import {AxiosHttpClient} from "../../../../infra/http/axios-http-client/axios-http-client";
import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder} from "../../../../validation/validators/builder/validation-builder";

export const makeLogin: React.FC = () => {
    const url = "http://fordevs.herokuapp.com/api/login";
    const axiosHttpClient = new AxiosHttpClient();
    const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
    const validationComposite = new ValidationComposite([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().minLength(5).build()
    ]);

    return (
        <Login
            authentication={remoteAuthentication}
            validation={validationComposite}
        />
    );
}
