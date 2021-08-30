/// <reference types="cypress" />

export const isSubmitButtonEnabled = (enabled = true) => {
    cy.get(`[data-testid=submit-button]`).should(enabled ? "be.enabled" : "be.disabled");
}

export const clickSubmitButton = () => {
    cy.get(`[data-testid=submit-button]`).click();
    cy.get(`[data-testid=spinner]`).should("not.exist");
}

export const doubleClickSubmitButton = () => {
    cy.get(`[data-testid=submit-button]`).dblclick();
}
