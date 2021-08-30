/// <reference types="cypress" />

export const isWrapInvalid = (wrapName: string) => {
    cy.get(`[data-testid=${wrapName}]`).should("have.attr", "data-status", "invalid");
}
