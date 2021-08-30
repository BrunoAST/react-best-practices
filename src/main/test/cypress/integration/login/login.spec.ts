/// <reference types="cypress" />

import faker from "faker";
import {LOGIN_SELECTORS} from "../../support/selectors/login-selector";
import {login_fillCorrectEmailAndPassword} from "./login-fields";

const baseUrl = Cypress.config().baseUrl;

type SutParams = {
    status: number;
    response: object;
}

const makeSut = (params?: SutParams) => {
    cy.route({
        method: "POST",
        url: /login/,
        status: params?.status,
        response: params?.response,
    }).as("request");
}

beforeEach(() => {
    cy.visit("login");
    cy.server();
});

describe("Login", () => {
    it("Should initialize with email field focused", () => {
        cy.getByTestId(LOGIN_SELECTORS.emailStatus).focused();
    });

    it("Should load with correct initial state", () => {
        cy.containsErrorStatus(LOGIN_SELECTORS.emailStatus);
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.emailStatus, "Campo obrigatório");
        cy.containsErrorStatus(LOGIN_SELECTORS.passwordStatus);
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.passwordStatus, "Campo obrigatório");
        cy.isDisabled(LOGIN_SELECTORS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error if email field is invalid", () => {
        cy.getByTestId(LOGIN_SELECTORS.emailField).type(faker.random.words(5));
        cy.containsErrorStatus(LOGIN_SELECTORS.emailStatus);
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.emailStatus, "Email inválido");
        cy.isDisabled(LOGIN_SELECTORS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error if password field is invalid", () => {
        cy.getByTestId(LOGIN_SELECTORS.passwordField).type(faker.datatype.string(4));
        cy.containsErrorStatus(LOGIN_SELECTORS.passwordStatus);
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.passwordStatus, "Mínimo de 5 caracteres");
        cy.isDisabled(LOGIN_SELECTORS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present valid state if all fields are valid", () => {
        login_fillCorrectEmailAndPassword();
        cy.containsSuccessStatus(LOGIN_SELECTORS.emailStatus);
        cy.containsSuccessStatus(LOGIN_SELECTORS.passwordStatus);
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.emailStatus, "Tudo certo");
        cy.containsAttrTitleMessage(LOGIN_SELECTORS.passwordStatus, "Tudo certo");
        cy.isEnabled(LOGIN_SELECTORS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present invalid credentials error on 401", () => {
        makeSut({
            status: 401,
            response: {
                error: faker.random.words(),
            },
        });
        login_fillCorrectEmailAndPassword();
        cy.getByTestId(LOGIN_SELECTORS.submitButton).click();
        cy.getByTestId("spinner").should("not.exist");
        cy.getByTestId("main-error").should("have.text", "Credenciais inválidas");
        cy.url().should("eq", `${baseUrl}/login`);
    });

    it("Should present unexpected error on 400", () => {
        makeSut({
            status: 400,
            response: {
                error: faker.random.words(),
            },
        });
        login_fillCorrectEmailAndPassword();
        cy.getByTestId(LOGIN_SELECTORS.submitButton).click();
        cy.getByTestId("spinner").should("not.exist");
        cy.getByTestId("main-error").should(
            "have.text",
            "Algo de errado aconteceu. Tente novamente em breve"
        );
        cy.url().should("eq", `${baseUrl}/login`);
    });

    it("Should present unexpected error if invalid data is returned", () => {
        makeSut({
            status: 200,
            response: {
                invalidProperty: faker.random.words(),
            },
        });
        login_fillCorrectEmailAndPassword();
        cy.getByTestId(LOGIN_SELECTORS.submitButton).click();
        cy.getByTestId("spinner").should("not.exist");
        cy.getByTestId("main-error").should(
            "have.text",
            "Algo de errado aconteceu. Tente novamente em breve"
        );
        cy.url().should("eq", `${baseUrl}/login`);
    });

    it("Should present save access token if valid credentials provided", () => {
        makeSut({
            status: 200,
            response: {
                accessToken: faker.datatype.uuid(),
            },
        });
        login_fillCorrectEmailAndPassword();
        cy.getByTestId(LOGIN_SELECTORS.submitButton).click();
        cy.getByTestId("main-error").should("not.exist");
        cy.getByTestId("spinner").should("not.exist");
        cy.url().should("eq", `${baseUrl}/`);
        cy.window().then(window => assert.isOk(window.localStorage.getItem("accessToken")));
    });

    it("Should prevent multiple submits", () => {
        makeSut({
            status: 200,
            response: {
                accessToken: faker.datatype.uuid(),
            },
        });
        login_fillCorrectEmailAndPassword();
        cy.getByTestId(LOGIN_SELECTORS.submitButton).dblclick();
        cy.get("@request.all").should("have.length", 1);
    });
});
