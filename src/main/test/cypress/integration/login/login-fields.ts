/// <reference types="cypress" />

import {LOGIN_SELECTORS} from "../../support/selectors/login-selector";
import faker from "faker";

export const login_fillCorrectEmailAndPassword = () => {
    cy.getByTestId(LOGIN_SELECTORS.emailField).type(faker.internet.email());
    cy.getByTestId(LOGIN_SELECTORS.passwordField).type(faker.internet.password()).type("{enter}");
}
