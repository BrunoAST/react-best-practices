/// <reference types="cypress" />

export const shouldNotHaveDescendants = (): void => {
    cy.get(`[data-testid=error-wrap]`).should("not.have.descendants");
}

export const shouldNotExistMainErrorWrap = (): void => {
    cy.get(`[data-testid=main-error]`).should("not.exist");
}

export const shouldMainErrorHaveText = (text: string): void => {
    cy.get(`[data-testid=main-error]`).should("have.text", text);
}
