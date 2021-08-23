import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import faker from "faker";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import Login from "../Login";
import {ValidationStub} from "../../../test/mock-validation";
import {AuthenticationSpy} from "../../../test/mock-authentication";
import {SaveAccessTokenMock} from "../../../test/mock-save-access-token";
import {InvalidCredentialsError} from "../../../../domain/errors/invalid-credentials-error";
import {ROUTES} from "../../../components/Router/constants/routes.const";
import {simulateLoginValidSubmit} from "./login-test-helper";
import {
    populateField,
    testButtonIsDisabled,
    testChildCount,
    testElementExists,
    testElementText,
    testStatusForField
} from "../../../test/form-helper";

const history = createMemoryHistory({initialEntries: [ROUTES.LOGIN]});

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
    saveAccessTokenMock: SaveAccessTokenMock;
}

type SutParams = {
    validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();
    const saveAccessTokenMock = new SaveAccessTokenMock();
    validationStub.errorMessage = params?.validationError;
    const sut = render(
        <Router history={history}>
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>
    );
    return {sut, authenticationSpy, saveAccessTokenMock};
}

afterEach(() => {
    cleanup();
});

describe("Login Component", () => {
    it("Should not render spinner and error on start", () => {
        const {sut} = makeSut();
        testChildCount(sut, "error-wrap", 0);
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
        populateField(sut, "email", faker.internet.email());
    });

    it("Should show password error if validation fails", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        populateField(sut, "password", faker.internet.password());
        testStatusForField(sut, "password", validationError);
    });

    it("Should show valid email state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "email", faker.internet.email());
        testStatusForField(sut, "email");
    });

    it("Should show valid password state if validation succeeds", () => {
        const {sut} = makeSut();
        populateField(sut, "password", faker.internet.password());
        testStatusForField(sut, "password");
    });

    it("Should enable submit button if form is valid", () => {
        const {sut} = makeSut();
        populateField(sut, "email", faker.internet.email());
        populateField(sut, "password", faker.internet.password());
        testButtonIsDisabled(sut, "submit-button", false);
    });

    it("Should show spinner on submit", async () => {
        const {sut} = makeSut();
        await simulateLoginValidSubmit(sut);
        testElementExists(sut, "spinner")
    });

    it("Should call Authentication with correct values", async () => {
        const {sut, authenticationSpy} = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();
        await simulateLoginValidSubmit(sut, email, password);
        expect(authenticationSpy.params).toEqual({email, password});
    });

    it("Should call Authentication only once", async () => {
        const {sut, authenticationSpy} = makeSut();
        await simulateLoginValidSubmit(sut);
        await simulateLoginValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(1);
    });

    it("Should not call Authentication if form is invalid", async () => {
        const validationError = faker.random.words();
        const {sut, authenticationSpy} = makeSut({validationError});
        await simulateLoginValidSubmit(sut);
        expect(authenticationSpy.callsCount).toBe(0);
    });

    it("Should present error if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
        await simulateLoginValidSubmit(sut);
        testElementText(sut, "main-error", error.message);
    });

    it("Should hide spinner if Authentication fails", async () => {
        const {sut, authenticationSpy} = makeSut();
        const error = new InvalidCredentialsError();
        jest.spyOn(authenticationSpy, "auth").mockRejectedValueOnce(error);
        await simulateLoginValidSubmit(sut);
        testChildCount(sut, "error-wrap", 1);
    });

    it("Should call SaveAccessToken on success", async () => {
        const {sut, authenticationSpy, saveAccessTokenMock} = makeSut();
        await simulateLoginValidSubmit(sut);
        expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    });

    it("Should present error if SaveAccessToken fails", async () => {
        const {sut, saveAccessTokenMock} = makeSut();
        const error = new Error(faker.random.words());
        jest.spyOn(saveAccessTokenMock, "save").mockRejectedValueOnce(error);
        await simulateLoginValidSubmit(sut);
        testElementText(sut, "main-error", error.message);
        testChildCount(sut, "error-wrap", 1);
    });

    it("Should navigate to home page", async () => {
        const {sut} = makeSut();
        await simulateLoginValidSubmit(sut);
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe("/");
    });

    it("Should go to sign up page", async () => {
        const {sut} = makeSut();
        const signUp = sut.getByTestId("sign-up-link");
        fireEvent.click(signUp);
        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe("/signup");
    });
});
