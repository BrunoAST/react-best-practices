/// <reference types="cypress" />

const baseUrl = Cypress.config().baseUrl;

export const urlEquals = (value: string): void => {
    cy.url().should("eq", `${baseUrl}/${value}`);
}
