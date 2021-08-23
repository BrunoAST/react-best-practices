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
