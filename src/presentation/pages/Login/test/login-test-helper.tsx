import { fireEvent, waitFor, screen } from "@testing-library/react";
import faker from "faker";
import { populateField } from "../../../test/form-helper";

export const simulateLoginValidSubmit = async (
  email = faker.internet.email(), password = faker.internet.password()
): Promise<void> => {
  populateField("email", email);
  populateField("password", password);
  const form = screen.getByTestId("form") as HTMLButtonElement;
  fireEvent.submit(form);
  await waitFor(() => form);
}
