import React from "react";
import {render, RenderResult} from "@testing-library/react";
import Login from "./Login";

type SutTypes = {
    sut: RenderResult;
}

const makeSut = (): SutTypes => {
    const sut = render(<Login/>);
    return {sut};
}

describe("Login Component", () => {
    it("Should not render spinner and error on start", () => {
        const errorWrap = makeSut().sut.getByTestId("error-wrap");
        expect(errorWrap.childElementCount).toBe(0);
    });

    it("Should start with submit button disabled", () => {
        const submitButton = makeSut().sut.getByTestId("submit-button") as HTMLButtonElement;
        expect(submitButton.disabled).toBeTruthy();
    });

    it("Should start with the initial status label for email input", () => {
        const emailStatus = makeSut().sut.getByTestId("email-status");
        expect(emailStatus.title).toBe("Campo obrigatório");
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should start with the initial status label for password input", () => {
        const passwordStatus = makeSut().sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe("Campo obrigatório");
        expect(passwordStatus.textContent).toBe("🔴");
    });
});
