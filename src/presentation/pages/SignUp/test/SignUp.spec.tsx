import React from "react";
import {createMemoryHistory} from "history";
import faker from "faker";
import {cleanup, render, RenderResult} from "@testing-library/react";
import {ROUTES} from "../../../components/Router/routes.const";
import SignUp from "../SignUp";
import {
    populateField,
    testButtonIsDisabled,
    testChildCount,
    testElementExists, testElementText,
    testStatusForField
} from "../../../test/form-helper";
import {ValidationStub} from "../../../test/mock-validation";
import {simulateValidSignUpSubmit} from "./signup-test-helper";
import {AddAccountSpy} from "../../../test/mock-add-account";
import {simulateLoginValidSubmit} from "../../Login/test/login-test-helper";
import {InvalidCredentialsError} from "../../../../domain/errors/invalid-credentials-error";

const history = createMemoryHistory({initialEntries: [ROUTES.SIGNUP]});

type SutTypes = {
    sut: RenderResult;
    addAccountSpy: AddAccountSpy;
}

type SutParams = {
    validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const addAccountSpy = new AddAccountSpy()
    const sut = render(
        <SignUp
            validation={validationStub}
            addAccount={addAccountSpy}
        />
    );
    return {sut, addAccountSpy};
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
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
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

    it("Should enable submit button if form is valid", () => {
        const {sut} = makeSut();
        populateField(sut, "name", faker.name.firstName());
        populateField(sut, "email", faker.internet.email());
        populateField(sut, "password", faker.internet.password());
        populateField(sut, "passwordConfirmation", faker.internet.password());
        testButtonIsDisabled(sut, "submit-button", false);
    });

    it("Should show spinner on submit", async () => {
        const {sut} = makeSut();
        await simulateValidSignUpSubmit(sut);
        testElementExists(sut, "spinner");
    });

    it("Should call AddAccount with correct values", async () => {
        const {sut, addAccountSpy} = makeSut();
        const name = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await simulateValidSignUpSubmit(sut, name, email, password);
        expect(addAccountSpy.params).toEqual({
            name,
            email,
            password,
            passwordConfirmation: password
        });
    });

    it("Should call AddAccount only once", async () => {
        const {sut, addAccountSpy} = makeSut();
        await simulateValidSignUpSubmit(sut);
        await simulateValidSignUpSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(1);
    });

    it("Should not call AddAccount if form is invalid", async () => {
        const validationError = faker.random.words();
        const {sut, addAccountSpy} = makeSut({validationError});
        await simulateLoginValidSubmit(sut);
        expect(addAccountSpy.callsCount).toBe(0);
    });

    it("Should present error if AddAccount fails", async () => {
        const {sut, addAccountSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(addAccountSpy, "add").mockReturnValueOnce(Promise.reject(error));
        await simulateLoginValidSubmit(sut);
        testElementText(sut, "main-error", error.message);
    });
});
