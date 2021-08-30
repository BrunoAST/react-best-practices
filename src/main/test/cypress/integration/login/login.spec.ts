/// <reference types="cypress" />

import faker from "faker";
import {isWrapInvalid} from "../../support/assertions/input";
import {
    clickSubmitButton,
    doubleClickSubmitButton,
    isSubmitButtonEnabled
} from "../../support/assertions/submit-button";
import {
    shouldMainErrorHaveText,
    shouldNotExistMainErrorWrap,
    shouldNotHaveDescendants
} from "../../support/assertions/form-status";
import {urlEquals} from "../../support/assertions/url";

const makeRoute = (status: number, response: object) => {
    cy.route({method: "POST", url: /login/, status, response}).as("request");
}

const fillCorrectEmailAndPassword = () => {
    cy.get(`[data-testid=email]`).type(faker.internet.email());
    cy.get(`[data-testid=password]`).type(faker.internet.password());
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
        shouldNotHaveDescendants();
    });

    it("Should present error if email field is invalid", () => {
        cy.get(`[data-testid=email]`).type(faker.random.words(5));
        isWrapInvalid("email-wrap");
        cy.get(`[data-testid=email-label]`).should("have.attr", "title", "Email inválido");
        isSubmitButtonEnabled(false);
        shouldNotHaveDescendants();
    });

    it("Should present error if password field is invalid", () => {
        cy.get(`[data-testid=password]`).type(faker.datatype.string(4));
        isWrapInvalid("password-wrap");
        cy.get(`[data-testid=password-label]`).should("have.attr", "title", "Mínimo de 5 caracteres");
        isSubmitButtonEnabled(false);
        shouldNotHaveDescendants();
    });

    it("Should present valid state if all fields are valid", () => {
        fillCorrectEmailAndPassword();
        cy.get(`[data-testid=email-wrap]`).should("have.attr", "data-status", "valid");
        cy.get(`[data-testid=password-wrap]`).should("have.attr", "data-status", "valid");
        isSubmitButtonEnabled();
        shouldNotHaveDescendants();
    });

    it("Should present invalid credentials error on 401", () => {
        makeRoute(401, {error: faker.random.words()});
        fillCorrectEmailAndPassword();
        clickSubmitButton();
        shouldMainErrorHaveText("Credenciais inválidas");
        urlEquals("login");
    });

    it("Should present unexpected error on 400", () => {
        makeRoute(400, {error: faker.random.words()});
        fillCorrectEmailAndPassword();
        clickSubmitButton();
        shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present unexpected error if invalid data is returned", () => {
        makeRoute(200, {invalidProperty: faker.random.words()});
        fillCorrectEmailAndPassword();
        clickSubmitButton();
        shouldMainErrorHaveText("Algo de errado aconteceu. Tente novamente em breve");
        urlEquals("login");
    });

    it("Should present save access token if valid credentials provided", () => {
        makeRoute(200, {accessToken: faker.datatype.uuid()});
        fillCorrectEmailAndPassword();
        clickSubmitButton();
        shouldNotExistMainErrorWrap();
        urlEquals("");
        cy.window().then(window => assert.isOk(window.localStorage.getItem("accessToken")));
    });

    it("Should prevent multiple submits", () => {
        makeRoute(200, {accessToken: faker.datatype.uuid()});
        fillCorrectEmailAndPassword();
        doubleClickSubmitButton();
        cy.get("@request.all").should("have.length", 1);
    });

    it("Should not call submit if form is invalid", () => {
        makeRoute(200, {accessToken: faker.datatype.uuid()});
        fillEmail();
        cy.get("@request.all").should("have.length", 0);
    });
});
