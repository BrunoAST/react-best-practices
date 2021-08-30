/// <reference types="cypress" />

export const testLocalStorageItem = (key: string): void => {
    cy.window().then(window => assert.isOk(window.localStorage.getItem(key)));
}
