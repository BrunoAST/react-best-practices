/// <reference types="cypress" />

import faker from "faker";
import { isWrapInvalid } from "../support/assertions/input";
import * as SubmitButtonAssertions from "../support/assertions/submit-button";
import * as FormStatusAssertions from "../support/assertions/form-status";
import { urlEquals } from "../support/assertions/url";
import { mockInvalidCredentialsError, mockInvalidData, mockOk, mockUnexpectedError } from "../support/mocks/login-mocks";
import { testLocalStorageItem } from "../support/assertions/local-storage";
import { isSubmitButtonEnabled } from "../support/assertions/submit-button";
import { getByTestId } from "../support/selectors/data-type-selector";

const fillCorrectEmailAndPassword = () => {
    getByTestId("email").type(faker.internet.email());
    getByTestId("password").type(faker.internet.password());
}

const fillEmail = () => {
    getByTestId("password").type(faker.internet.email()).type("{enter}");
}

beforeEach(() => {
    cy.visit("login");
    cy.server();
});

describe("Login", () => {
    it("Should initialize with email field focused", () => {
        getByTestId("email-label").focused();
    });

    it("Should load with correct initial state", () => {
        isWrapInvalid("email");
        getByTestId("email-label").should("have.attr", "title", "Campo obrigatório");
        isWrapInvalid("password");
        getByTestId("password-label").should("have.attr", "title", "Campo obrigatório");
        isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if email field is invalid", () => {
        getByTestId("email").type(faker.random.words(5));
        isWrapInvalid("email");
        getByTestId("email-label").should("have.attr", "title", "Email inválido");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if password field is invalid", () => {
        getByTestId("password").type(faker.datatype.string(4));
        isWrapInvalid("password");
        getByTestId("password-label").should("have.attr", "title", "Mínimo de 5 caracteres");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present valid state if all fields are valid", () => {
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.clickSubmitButton();
        isWrapInvalid("email", true);
        isWrapInvalid("password", true);
        SubmitButtonAssertions.isSubmitButtonEnabled();
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present invalid credentials error on 401", () => {
        mockInvalidCredentialsError();
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Credenciais inválidas");
        urlEquals("login");
    });

    it("Should present unexpected error on 400", () => {
        mockUnexpectedError();
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present unexpected error if invalid data is returned", () => {
        mockInvalidData();
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present save access token if valid credentials provided", () => {
        mockOk();
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.doubleClickSubmitButton();
        FormStatusAssertions.shouldNotExistMainErrorWrap();
        urlEquals("");
        testLocalStorageItem("account");
    });

    it("Should prevent multiple submits", () => {
        mockOk();
        fillCorrectEmailAndPassword();
        SubmitButtonAssertions.doubleClickSubmitButton();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        mockOk();
        fillEmail();
        cy.get("@request.all").should("have.length", 0);
    });
});
