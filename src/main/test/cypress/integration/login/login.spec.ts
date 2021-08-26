/// <reference types="cypress" />

beforeEach(() => {
    cy.visit("login");
});

describe("Login", () => {
    it("Should load with correct initial state", () => {
        cy.getByTestId("email-status")
            .should("have.attr", "title", "Campo obrigatório")
            .should("contain.text", "🔴");
        cy.getByTestId("password-status")
            .should("have.attr", "title", "Campo obrigatório")
            .should("contain.text", "🔴");
        cy.getByTestId("submit-button").should("be.disabled");
        cy.getByTestId("error-wrap").should("not.have.descendants");
    });
});
