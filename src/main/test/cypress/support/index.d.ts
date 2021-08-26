// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        getByTestId(id: string): Chainable<Element>;
        containsErrorStatus(id: string): Chainable<Element>;
        containsErrorMessage(id: string, errorMessage: string): Chainable<Element>;
        isDisabled(id: string): Chainable<Element>;
    }
}
