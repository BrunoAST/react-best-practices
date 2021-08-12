import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import faker from "faker";
import Login from "./Login";
import {Validation} from "../../protocols/validation";

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationSpy;
}

class ValidationSpy implements Validation {
    errorMessage: string;
    fieldName: string;
    fieldValue: string;

    validate(fieldName: string, fieldValue: string): string {
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        return this.errorMessage;
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = render(<Login validation={validationSpy}/>);
    return {sut, validationSpy};
}

afterEach(() => {
    cleanup();
});

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

    it("Should call email validation with correct value", () => {
        const fakeEmail = faker.internet.email();
        const {sut, validationSpy} = makeSut();
        const emailInput = sut.getByTestId("email");
        fireEvent.input(emailInput, {target: {value: fakeEmail}});
        expect(validationSpy.fieldName).toBe("email");
        expect(validationSpy.fieldValue).toBe(fakeEmail);
    });

    it("Should call password validation with correct value", () => {
        const fakePassword = faker.internet.password();
        const {sut, validationSpy} = makeSut();
        const passwordInput = sut.getByTestId("password");
        fireEvent.input(passwordInput, {target: {value: fakePassword}});
        expect(validationSpy.fieldName).toBe("password");
        expect(validationSpy.fieldValue).toBe(fakePassword);
    });
});
