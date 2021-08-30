/// <reference types="cypress" />

export const shouldNotHaveDescendants = () => {
    cy.get(`[data-testid=error-wrap]`).should("not.have.descendants");
}

export const shouldNotExistMainErrorWrap = () => {
    cy.get(`[data-testid=main-error]`).should("not.exist");
}

export const shouldMainErrorHaveText = (text: string) => {
    cy.get(`[data-testid=main-error]`).should("have.text", text);
}
