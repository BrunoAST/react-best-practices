/// <reference types="cypress" />

import Chainable = Cypress.Chainable;

export const getByTestId = (id: string): Chainable<JQuery<HTMLElement>> => {
    return cy.get(`[data-testid=${id}]`);
}
