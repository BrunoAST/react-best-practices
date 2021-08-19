import {fireEvent, RenderResult, waitFor} from "@testing-library/react";
import faker from "faker";

export const simulateValidSubmit = async (
    sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()
): Promise<void> => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);
    await waitFor(() => form);
}

export const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {target: {value: email}});
}

export const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {target: {value: password}});
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const emailStatus = sut.getByTestId(`${fieldName}-status`);
    expect(emailStatus.title).toBe(validationError || "Tudo certo");
    expect(emailStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

export const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(count);
}

export const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element).toBeTruthy();
}

export const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.textContent).toBe(text);
}

export const testButtonIsDisabled = (sut: RenderResult, fieldName: string, isDisabled: boolean): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
}