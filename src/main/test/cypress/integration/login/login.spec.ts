/// <reference types="cypress" />

import faker from "faker";
import {isWrapInvalid} from "../../support/assertions/input";
import * as SubmitButtonAssertions from "../../support/assertions/submit-button";
import * as FormStatusAssertions from "../../support/assertions/form-status";
import {urlEquals} from "../../support/assertions/url";
import {mockInvalidCredentialsError, mockInvalidData, mockOk, mockUnexpectedError} from "../../support/mocks/login-mocks";
import {testLocalStorageItem} from "../../support/assertions/local-storage";
import {clickSubmitButton} from "../../support/assertions/submit-button";

const fillCorrectEmailAndPassword = () => {
    cy.get(`[data-testid=email]`).type(faker.internet.email());
    cy.get(`[data-testid=password]`).type(faker.internet.password());
    SubmitButtonAssertions.clickSubmitButton();
}

const fillEmail = () => {
    cy.get(`[data-testid=password]`).type(faker.internet.email()).type("{enter}");
}

beforeEach(() => {
    cy.visit("login");
    cy.server();
});

describe("Login", () => {
    it("Should initialize with email field focused", () => {
        cy.get(`[data-testid=email-label]`).focused();
    });

    it("Should load with correct initial state", () => {
        isWrapInvalid("email-wrap");
        cy.get(`[data-testid=email-label]`).should("have.attr", "title", "Campo obrigatório");
        cy.get(`[data-testid=password-wrap]`).should("have.attr", "data-status", "invalid");
        cy.get(`[data-testid=password-label]`).should("have.attr", "title", "Campo obrigatório");
        cy.get(`[data-testid=submit-button]`).should("be.disabled");
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if email field is invalid", () => {
        cy.get(`[data-testid=email]`).type(faker.random.words(5));
        isWrapInvalid("email-wrap");
        cy.get(`[data-testid=email-label]`).should("have.attr", "title", "Email inválido");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present error if password field is invalid", () => {
        cy.get(`[data-testid=password]`).type(faker.datatype.string(4));
        isWrapInvalid("password-wrap");
        cy.get(`[data-testid=password-label]`).should("have.attr", "title", "Mínimo de 5 caracteres");
        SubmitButtonAssertions.isSubmitButtonEnabled(false);
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present valid state if all fields are valid", () => {
        fillCorrectEmailAndPassword();
        isWrapInvalid("email-wrap", true);
        isWrapInvalid("password-wrap", true);
        SubmitButtonAssertions.isSubmitButtonEnabled();
        FormStatusAssertions.shouldNotHaveDescendants();
    });

    it("Should present invalid credentials error on 401", () => {
        mockInvalidCredentialsError();
        fillCorrectEmailAndPassword();
        FormStatusAssertions.shouldMainErrorHaveText("Credenciais inválidas");
        urlEquals("login");
    });

    it("Should present unexpected error on 400", () => {
        mockUnexpectedError();
        fillCorrectEmailAndPassword();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present unexpected error if invalid data is returned", () => {
        mockInvalidData();
        fillCorrectEmailAndPassword();
        FormStatusAssertions.shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present save access token if valid credentials provided", () => {
        mockOk();
        fillCorrectEmailAndPassword();
        FormStatusAssertions.shouldNotExistMainErrorWrap();
        urlEquals("");
        testLocalStorageItem("accessToken");
    });

    it("Should prevent multiple submits", () => {
        mockOk();
        fillCorrectEmailAndPassword();
        clickSubmitButton();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        mockOk();
        fillEmail();
        cy.get("@request.all").should("have.length", 0);
    });
});
