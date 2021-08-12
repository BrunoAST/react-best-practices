import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import faker from "faker";
import Login from "./Login";
import {ValidationStub} from "../../test/mock-validation";

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationStub;
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationStub();
    validationSpy.errorMessage = faker.random.words();
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
        const {sut, validationSpy} = makeSut();
        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should start with the initial status label for password input", () => {
        const {sut, validationSpy} = makeSut();
        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe(validationSpy.errorMessage);
        expect(passwordStatus.textContent).toBe("🔴");
    });

    it("Should show email error if validation fails", () => {
        const {sut, validationSpy} = makeSut();
        const emailInput = sut.getByTestId("email");
        const emailStatus = sut.getByTestId("email-status");
        fireEvent.input(emailInput, {target: {value: faker.internet.email()}});
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should show password error if validation fails", () => {
        const {sut, validationSpy} = makeSut();
        const passwordInput = sut.getByTestId("password");
        const passwordStatus = sut.getByTestId("password-status");
        fireEvent.input(passwordInput, {target: {value: faker.internet.password()}});
        expect(passwordStatus.title).toBe(validationSpy.errorMessage);
        expect(passwordStatus.textContent).toBe("🔴");
    });
});
