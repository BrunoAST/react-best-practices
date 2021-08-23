import React from "react";
import {createMemoryHistory} from "history";
import faker from "faker";
import {render, RenderResult} from "@testing-library/react";
import {testButtonIsDisabled, testChildCount, testStatusForField} from "../Login/login-test-helper";
import {ROUTES} from "../../components/Router/routes.const";
import SignUp from "./SignUp";

const history = createMemoryHistory({initialEntries: [ROUTES.SIGNUP]});

type SutTypes = {
    sut: RenderResult;
}

const makeSut = (): SutTypes => {
    const sut = render(
        <SignUp/>
    );
    return {sut};
}

describe("SignUp Component", () => {
    it("Should not render spinner and error on start", () => {
        const {sut} = makeSut();
        testChildCount(sut, "error-wrap", 0);
    });

    it("Should start with submit button disabled", () => {
        const {sut} = makeSut();
        testButtonIsDisabled(sut, "submit-button", true);
    });

    it("Should start with the initial status label for inputs", () => {
        const validationError = "Campo obrigatório";
        const {sut} = makeSut();
        testStatusForField(sut, "name", validationError);
        testStatusForField(sut, "email", validationError);
        testStatusForField(sut, "password", validationError);
        testStatusForField(sut, "passwordConfirmation", validationError);
    });
});
