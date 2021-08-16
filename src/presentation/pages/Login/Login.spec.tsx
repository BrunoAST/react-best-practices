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

const history = createMemoryHistory({initialEntries: ["/login"]});

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

const simulateValidSubmit = async (
    sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()
): Promise<void> => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);
    await waitFor(() => form);
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {target: {value: email}});
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {target: {value: password}});
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`);
    expect(emailStatus.title).toBe(validationError || "Tudo certo");
    expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(count);
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element).toBeTruthy();
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.textContent).toBe(text);
}

const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
}

beforeEach(() => {
    localStorage.clear();
});

afterEach(() => {
    cleanup();
});

describe("Login Component", () => {
    it("Should not render spinner and error on start", () => {
        const {sut} = makeSut();
        testErrorWrapChildCount(sut, 0);
    });

    it("Should start with submit button disabled", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        testButtonIsDisabled(sut, "submit-button", true);
    });

    it("Should start with the initial status label for email input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        testStatusForField(sut, "email", validationError);
    });

    it("Should start with the initial status label for password input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        testStatusForField(sut, "password", validationError);
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
        testStatusForField(sut, "password", validationError);
    });

    it("Should show valid email state if validation succeeds", () => {
        const {sut} = makeSut();
        populateEmailField(sut);
        testStatusForField(sut, "email");
    });

    it("Should show valid password state if validation succeeds", () => {
        const {sut} = makeSut();
        populatePasswordField(sut);
        testStatusForField(sut, "password");
    });

    it("Should enable submit button if form is valid", () => {
        const {sut} = makeSut();
        populateEmailField(sut);
        populatePasswordField(sut);
        testButtonIsDisabled(sut, "submit-button", false);
    });

    it("Should show spinner on submit", async () => {
        const {sut} = makeSut();
        await simulateValidSubmit(sut);
        testElementExists(sut, "spinner")
    });

    it("Should call Authentication with correct values", async () => {
        const {sut, authenticationSpy} = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await simulateValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({email, password});
    });

    it("Should call Authentication only once", async () => {
        const {sut, authenticationSpy} = makeSut();
        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    it("Should not call Authentication if form is invalid", async () => {
        const validationError = faker.random.words();
        const {sut, authenticationSpy} = makeSut({validationError});
        await simulateValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(0);
    });

    it("Should present error if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit(sut);
        testElementText(sut, "main-error", error.message);
    });

    it("Should hide spinner if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
        await simulateValidSubmit(sut);
        testErrorWrapChildCount(sut, 1);
    });

    it("Should add accessToken to local storage on success", async () => {
        const {sut, authenticationSpy} = makeSut();
        await simulateValidSubmit(sut);
        expect(localStorage.setItem)
            .toHaveBeenCalledWith("accessToken", authenticationSpy.account.accessToken);
    });

    it("Should navigate to home page", async () => {
        const {sut} = makeSut();
        await simulateValidSubmit(sut);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe("/");
    });

    it("Should go to sign up page", async () => {
        const {sut} = makeSut();
        const signUp = sut.getByTestId("sign-up");
        fireEvent.click(signUp);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe("/signup");
    });
});
