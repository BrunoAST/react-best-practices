import {fireEvent, RenderResult, waitFor} from "@testing-library/react";
import faker from "faker";
import {populateField} from "../../../test/form-helper";

export const simulateValidSubmit = async (
    sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()
): Promise<void> => {
    populateField(sut, "email", email);
    populateField(sut, "password", password);
    const form = sut.getByTestId("form") as HTMLButtonElement;
    fireEvent.submit(form);
    await waitFor(() => form);
}
