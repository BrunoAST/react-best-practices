import {fireEvent, RenderResult, waitFor} from "@testing-library/react";
import faker from "faker";
import {populateField} from "../../../test/form-helper";

export const simulateValidSignUpSubmit = async (
    sut: RenderResult,
    name: string = faker.name.firstName(),
    email: string = faker.internet.email(),
    password: string = faker.internet.password(),
): Promise<void> => {
    populateField(sut, "name", name);
    populateField(sut, "email", email);
    populateField(sut, "password", password);
    populateField(sut, "passwordConfirmation", password);
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);
    await waitFor(() => form);
}
