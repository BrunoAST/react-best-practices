/// <reference types="cypress" />

import faker from "faker";
import { isWrapInvalid } from "../support/assertions/input";
import * as FormStatusAssertions from "../support/assertions/form-status";
import * as SubmitButtonAssertions from "../support/assertions/submit-button";
import { getByTestId } from "../support/selectors/data-type-selector";
import { isSubmitButtonEnabled } from "../support/assertions/submit-button";
import { urlEquals } from "../support/assertions/url";
import { mockEmailInUse, mockUnexpectedError, mockInvalidData, mockOk } from "../support/mocks/sinup-mocks";
import { testLocalStorageItem } from "../support/assertions/local-storage";

const fillAllFields = () => {
    const password = faker.internet.password();
    getByTestId("name").type(faker.datatype.string(5));
    getByTestId("email").type(faker.internet.email());
    getByTestId("password").type(password);
    getByTestId("passwordConfirmation").type(password);
}

beforeEach(() => {
    cy.visit("signup");
    cy.server();
});

describe("Sign up", () => {
    it("Should initialize with name field focused", () => {
        getByTestId("name-label").focused();
    });

    it("Should load with correct initial state", () => {
        isWrapInvalid("name");
        getByTestId("name-label").should("have.attr", "title", "Campo obrigatório");
        isWrapInvalid("email");
        getByTestId("email-label").should("have.attr", "title", "Campo obrigatório");
        isWrapInvalid("password");
        getByTestId("password-label").should("have.attr", "title", "Campo obrigatório");
        isWrapInvalid("passwordConfirmation");
        getByTestId("passwordConfirmation-label").should("have.attr", "title", "Campo obrigatório");
        isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if name field is less than 5 characters", () => {
        getByTestId("name").type(faker.datatype.string(4));
        isWrapInvalid("name");
        getByTestId("name-label").should("have.attr", "title", "Mínimo de 5 caracteres");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if email field is invalid", () => {
        getByTestId("email").type(faker.random.words());
        isWrapInvalid("email");
        getByTestId("email-label").should("have.attr", "title", "Email inválido");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if password field is less than 5 characters", () => {
        getByTestId("password").type(faker.datatype.string(4));
        isWrapInvalid("password");
        getByTestId("password-label").should("have.attr", "title", "Mínimo de 5 caracteres");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if passwordConfirmation is different from password", () => {
        getByTestId("password").type(faker.internet.password());
        getByTestId("passwordConfirmation").type(faker.internet.password());
        getByTestId("passwordConfirmation-label").should("have.attr", "title", "Campo inválido");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present valid state if all fields are valid", () => {
        fillAllFields();
        SubmitButtonAssertions.clickSubmitButton();
        isWrapInvalid("name", true);
        isWrapInvalid("email", true);
        isWrapInvalid("password", true);
        isWrapInvalid("passwordConfirmation", true);
        SubmitButtonAssertions.isSubmitButtonEnabled();
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present EmailInUse error on 403", () => {
        mockEmailInUse();
        fillAllFields();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Esse email já está em uso");
        urlEquals("signup");
    });

    it("Should present unexpected error if invalid data is returned", () => {
        mockInvalidData();
        fillAllFields();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("signup");
    });

    it("Should present unexpected error on default error cases", () => {
        mockUnexpectedError();
        fillAllFields();
        SubmitButtonAssertions.clickSubmitButton();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("signup");
    });

    it("Should present save access token if valid credentials provided", () => {
        mockOk();
        fillAllFields();
        SubmitButtonAssertions.doubleClickSubmitButton();
        FormStatusAssertions.shouldNotExistMainErrorWrap();
        urlEquals("");
        testLocalStorageItem("account");
    });

    it("Should prevent multiple submits", () => {
        mockOk();
        fillAllFields();
        SubmitButtonAssertions.doubleClickSubmitButton();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        mockOk();
        getByTestId("email").type(faker.internet.email()).type("{enter}");
        cy.get("@request.all").should("have.length", 0);
    });
});
