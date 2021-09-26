/// <reference types="cypress" />

import { getByTestId } from "../selectors/data-type-selector";

export const shouldNotHaveDescendants = (): void => {
    getByTestId("error-wrap").should("not.have.descendants");
}

export const shouldNotExistMainErrorWrap = (): void => {
    getByTestId("main-error").should("not.exist");
}

export const shouldMainErrorHaveText = (text: string): void => {
    getByTestId("main-error").should("have.text", text);
}
