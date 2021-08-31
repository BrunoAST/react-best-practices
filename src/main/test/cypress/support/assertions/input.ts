/// <reference types="cypress" />

import {getByTestId} from "../selectors/data-type-selector";

export const isWrapInvalid = (wrap: string, isValid = false): void => {
    getByTestId(`${wrap}-wrap`).should("have.attr", "data-status", !isValid ? "invalid" : "valid");
}
