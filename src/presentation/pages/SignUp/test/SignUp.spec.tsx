import React from "react";
import {createMemoryHistory} from "history";
import faker from "faker";
import {cleanup, render, RenderResult} from "@testing-library/react";
import {ROUTES} from "../../../components/Router/routes.const";
import SignUp from "../SignUp";
import {populateField, testButtonIsDisabled, testChildCount, testStatusForField} from "../../../test/form-helper";
import {ValidationStub} from "../../../test/mock-validation";

const history = createMemoryHistory({initialEntries: [ROUTES.SIGNUP]});

type SutTypes = {
    sut: RenderResult;
}

type SutParams = {
    validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <SignUp
            validation={validationStub}
        />
    );
    return {sut};
}

afterEach(() => {
    cleanup();
});

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
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        testStatusForField(sut, "name", validationError);
        testStatusForField(sut, "email", validationError);
        testStatusForField(sut, "password", validationError);
        testStatusForField(sut, "passwordConfirmation", validationError);
    });

    it("Should show name error if validation fails", () => {
        const validationError = "Campo obrigatório";
        const {sut} = makeSut({validationError});
        populateField(sut, "name", validationError);
    });

    it("Should show email error if validation fails", () => {
        const validationError = "Campo obrigatório";
        const {sut} = makeSut({validationError});
        populateField(sut, "email", validationError);
    });

    it("Should show password error if validation fails", () => {
        const validationError = "Campo obrigatório";
        const {sut} = makeSut({validationError});
        populateField(sut, "password", validationError);
    });

    it("Should show passwordConfirmation error if validation fails", () => {
        const validationError = "Campo obrigatório";
        const {sut} = makeSut({validationError});
        populateField(sut, "passwordConfirmation", validationError);
    });

    it("Should show valid name state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "name", faker.name.firstName());
        testStatusForField(sut, "name");
    });

    it("Should show email name state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "email", faker.internet.email());
        testStatusForField(sut, "email");
    });

    it("Should show email password state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "password", faker.internet.password());
        testStatusForField(sut, "password");
    });

    it("Should show email passwordConfirmation state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "passwordConfirmation", faker.internet.password());
        testStatusForField(sut, "passwordConfirmation");
    });
});
