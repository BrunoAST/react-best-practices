/// <reference types="cypress" />

import faker from "faker";

const baseUrl = Cypress.config().baseUrl;

const DATA_TEST_IDS = {
    emailStatus: "email-status",
    emailField: "email",
    passwordStatus: "password-status",
    passwordField: "password",
    submitButton: "submit-button",
}

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
        cy.getByTestId(DATA_TEST_IDS.emailStatus).focused();
    });

    it("Should load with correct initial state", () => {
        cy.containsErrorStatus(DATA_TEST_IDS.emailStatus);
        cy.containsAttrTitleMessage(DATA_TEST_IDS.emailStatus, "Campo obrigatório");
        cy.containsErrorStatus(DATA_TEST_IDS.passwordStatus);
        cy.containsAttrTitleMessage(DATA_TEST_IDS.passwordStatus, "Campo obrigatório");
        cy.isDisabled(DATA_TEST_IDS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error if email field is invalid", () => {
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.random.words(5));
        cy.containsErrorStatus(DATA_TEST_IDS.emailStatus);
        cy.containsAttrTitleMessage(DATA_TEST_IDS.emailStatus, "Email inválido");
        cy.isDisabled(DATA_TEST_IDS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present error if password field is invalid", () => {
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.datatype.string(4));
        cy.containsErrorStatus(DATA_TEST_IDS.passwordStatus);
        cy.containsAttrTitleMessage(DATA_TEST_IDS.passwordStatus, "Mínimo de 5 caracteres");
        cy.isDisabled(DATA_TEST_IDS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present valid state if all fields are valid", () => {
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.containsSuccessStatus(DATA_TEST_IDS.emailStatus);
        cy.containsSuccessStatus(DATA_TEST_IDS.passwordStatus);
        cy.containsAttrTitleMessage(DATA_TEST_IDS.emailStatus, "Tudo certo");
        cy.containsAttrTitleMessage(DATA_TEST_IDS.passwordStatus, "Tudo certo");
        cy.isEnabled(DATA_TEST_IDS.submitButton);
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });

    it("Should present invalid credentials error on 401", () => {
        makeSut({
            status: 401,
            response: {
                error: faker.random.words(),
            },
        });
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.getByTestId(DATA_TEST_IDS.submitButton).click();
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
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.getByTestId(DATA_TEST_IDS.submitButton).click();
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
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.getByTestId(DATA_TEST_IDS.submitButton).click();
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
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.getByTestId(DATA_TEST_IDS.submitButton).click();
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
        cy.getByTestId(DATA_TEST_IDS.emailField).type(faker.internet.email());
        cy.getByTestId(DATA_TEST_IDS.passwordField).type(faker.internet.password());
        cy.getByTestId(DATA_TEST_IDS.submitButton).dblclick();
        cy.get("@request.all").should("have.length", 1);
    });
});
