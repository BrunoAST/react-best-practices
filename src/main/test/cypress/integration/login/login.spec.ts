/// <reference types="cypress" />

import faker from "faker";

const DATA_TEST_IDS = {
    emailStatus: "email-status",
    emailField: "email",
    passwordStatus: "password-status",
    passwordField: "password",
    submitButton: "submit-button",
}

beforeEach(() => {
    cy.visit("login");
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
});
