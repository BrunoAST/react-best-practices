/// <reference types="cypress" />

const baseUrl = Cypress.config().baseUrl;

export const urlEquals = (value: string) => {
    cy.url().should("eq", `${baseUrl}/${value}`);
}
