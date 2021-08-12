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

    it("Should start with the initial status label for email input", () => {
        const emailStatus = screen.getByTestId("email-status");
        expect(emailStatus.title).toBe("Campo obrigatório");
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should start with the initial status label for password input", () => {
        const passwordStatus = screen.getByTestId("password-status");
        expect(passwordStatus.title).toBe("Campo obrigatório");
        expect(passwordStatus.textContent).toBe("🔴");
    });
});
