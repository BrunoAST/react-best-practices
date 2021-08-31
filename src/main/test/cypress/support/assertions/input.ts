/// <reference types="cypress" />

import {getByTestId} from "../selectors/data-type-selector";

export const isWrapInvalid = (wrapName: string, isValid = false): void => {
    getByTestId(wrapName).should("have.attr", "data-status", !isValid ? "invalid" : "valid");
}
