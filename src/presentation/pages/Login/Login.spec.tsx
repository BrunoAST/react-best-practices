import React from "react";
import {render, screen} from "@testing-library/react";
import Login from "./Login";

beforeEach(() => {
    render(<Login/>);
})

describe("Login Component", () => {
    it("Should not render spinner and error on start", () => {
        const errorWrap = screen.getByTestId("error-wrap");
        expect(errorWrap.childElementCount).toBe(0);
    });

    it("Should start with submit button disabled", () => {
        const submitButton = screen.getByTestId("submit-button") as HTMLButtonElement;
        expect(submitButton.disabled).toBeTruthy();
    });
});
