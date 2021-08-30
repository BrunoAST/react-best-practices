/// <reference types="cypress" />

export const isWrapInvalid = (wrapName: string, isValid = false): void => {
    cy.get(`[data-testid=${wrapName}]`)
        .should("have.attr", "data-status", !isValid ? "invalid" : "valid");
}
