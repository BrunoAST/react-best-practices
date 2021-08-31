/// <reference types="cypress" />

import {getByTestId} from "../selectors/data-type-selector";

export const isSubmitButtonEnabled = (enabled = true): void => {
    getByTestId("submit-button").should(enabled ? "be.enabled" : "be.disabled");
}

export const clickSubmitButton = (): void => {
    getByTestId("submit-button").click();
    getByTestId("spinner").should("not.exist");
}

export const doubleClickSubmitButton = (): void => {
    getByTestId("submit-button").dblclick();
}
