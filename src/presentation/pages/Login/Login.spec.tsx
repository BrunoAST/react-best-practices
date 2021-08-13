import React from "react";
import {cleanup, fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import faker from "faker";
import "jest-localstorage-mock";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import Login from "./Login";
import {ValidationStub} from "../../test/mock-validation";
import {AuthenticationSpy} from "../../test/mock-authentication";
import {InvalidCredentialsError} from "../../../domain/errors/invalid-credentials-error";

const history = createMemoryHistory();

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
}

type SutParams = {
    validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Router history={history}>
            <Login validation={validationStub} authentication={authenticationSpy}/>
        </Router>
    );
    return {sut, authenticationSpy};
}

const simulateValidSubmit = (
    sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()
): void => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
    fireEvent.click(submitButton);
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {target: {value: email}});
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {target: {value: password}});
}

const simulateStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`);
    expect(emailStatus.title).toBe(validationError || "Tudo certo");
    expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    cleanup();
});

describe("Login Component", () => {
    it("Should not render spinner and error on start", () => {
        const errorWrap = makeSut().sut.getByTestId("error-wrap");
        expect(errorWrap.childElementCount).toBe(0);
    });

    it("Should start with submit button disabled", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
        expect(submitButton.disabled).toBeTruthy();
    });

    it("Should start with the initial status label for email input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        simulateStatusForField(sut, "email", validationError);
    });

    it("Should start with the initial status label for password input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        simulateStatusForField(sut, "password", validationError);
    });

    it("Should show email error if validation fails", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        populateEmailField(sut);

    });

    it("Should show password error if validation fails", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        populatePasswordField(sut);
        simulateStatusForField(sut, "password", validationError);
    });

    it("Should show valid email state if validation succeeds", () => {
        const {sut} = makeSut();
        populateEmailField(sut);
        simulateStatusForField(sut, "email");
    });

    it("Should show valid password state if validation succeeds", () => {
        const {sut} = makeSut();
        populatePasswordField(sut);
        simulateStatusForField(sut, "password");
    });

    it("Should enable submit button if form is valid", () => {
        const {sut} = makeSut();
        const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
        populateEmailField(sut);
        populatePasswordField(sut);
        expect(submitButton.disabled).toBeFalsy();
    });

    it("Should show spinner on submit", () => {
        const {sut} = makeSut();
        simulateValidSubmit(sut);
        const spinner = sut.getByTestId("spinner");
        expect(spinner).toBeTruthy();
    });

    it("Should call Authentication with correct values", () => {
        const {sut, authenticationSpy} = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({email, password});
    });

    it("Should call Authentication only once", () => {
        const {sut, authenticationSpy} = makeSut();
        simulateValidSubmit(sut);
        simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    it("Should not call Authentication if form is invalid", () => {
        const validationError = faker.random.words();
        const {sut, authenticationSpy} = makeSut({validationError});
        populateEmailField(sut);
        fireEvent.submit(sut.getByTestId("form"));
        expect(authenticationSpy.callsCount).toBe(0);
    });

    it("Should present error if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
        simulateValidSubmit(sut);
        const mainError = await waitFor(() => sut.getByTestId("main-error"));
        expect(mainError.textContent).toBe(error.message);
    });

    it("Should hide spinner if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
        simulateValidSubmit(sut);
        const errorWrap = await waitFor(() => sut.getByTestId("error-wrap"));
        expect(errorWrap.childElementCount).toBe(1);
    });

    it("Should add accessToken to local storage on success", async () => {
        const {sut, authenticationSpy} = makeSut();
        simulateValidSubmit(sut);
        await waitFor(() => sut.getByTestId("form"));
        expect(localStorage.setItem)
            .toHaveBeenCalledWith("accessToken", authenticationSpy.account.accessToken);
    });

    it("Should go to sign up page", async () => {
        const {sut} = makeSut();
        const signUp = sut.getByTestId("sign-up");
        fireEvent.click(signUp);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe("/signup");
    });
});
