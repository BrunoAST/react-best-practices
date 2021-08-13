import React from "react";
import {cleanup, fireEvent, render, RenderResult} from "@testing-library/react";
import faker from "faker";
import Login from "./Login";
import {ValidationStub} from "../../test/mock-validation";

type SutTypes = {
    sut: RenderResult;
}

type SutParams = {
    validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;
    const sut = render(<Login validation={validationStub}/>);
    return {sut};
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
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
        expect(submitButton.disabled).toBeTruthy();
    });

    it("Should start with the initial status label for email input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should start with the initial status label for password input", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe("🔴");
    });

    it("Should show email error if validation fails", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const emailInput = sut.getByTestId("email");
        const emailStatus = sut.getByTestId("email-status");
        fireEvent.input(emailInput, {target: {value: faker.internet.email()}});
        expect(emailStatus.title).toBe(validationError);
        expect(emailStatus.textContent).toBe("🔴");
    });

    it("Should show password error if validation fails", () => {
        const validationError = faker.random.words();
        const {sut} = makeSut({validationError});
        const passwordInput = sut.getByTestId("password");
        const passwordStatus = sut.getByTestId("password-status");
        fireEvent.input(passwordInput, {target: {value: faker.internet.password()}});
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordStatus.textContent).toBe("🔴");
    });

    it("Should show valid email state if validation succeeds", () => {
        const {sut} = makeSut();
        const emailInput = sut.getByTestId("email");
        const emailStatus = sut.getByTestId("email-status");
        fireEvent.input(emailInput, {target: {value: faker.internet.email()}});
        expect(emailStatus.title).toBe("Tudo certo");
        expect(emailStatus.textContent).toBe("🟢");
    });

    it("Should show valid password state if validation succeeds", () => {
        const {sut} = makeSut();
        const passwordInput = sut.getByTestId("password");
        const passwordStatus = sut.getByTestId("password-status");
        fireEvent.input(passwordInput, {target: {value: faker.internet.password()}});
        expect(passwordStatus.title).toBe("Tudo certo");
        expect(passwordStatus.textContent).toBe("🟢");
    });

    it("Should enable submit button if form is valid", () => {
        const {sut} = makeSut();
        const emailInput = sut.getByTestId("email");
        const passwordInput = sut.getByTestId("password");
        const submitButton = sut.getByTestId("submit-button") as HTMLButtonElement;
        fireEvent.input(emailInput, {target: {value: faker.internet.email()}});
        fireEvent.input(passwordInput, {target: {value: faker.internet.password()}});
        expect(submitButton.disabled).toBeFalsy();
    });
});
