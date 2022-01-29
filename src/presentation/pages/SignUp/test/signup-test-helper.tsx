import { fireEvent, screen, waitFor } from "@testing-library/react";
import faker from "faker";
import { populateField } from "../../../test/form-helper";

export const simulateValidSignUpSubmit = async (
  name: string = faker.name.firstName(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password(),
): Promise<void> => {
  populateField("name", name);
  populateField("email", email);
  populateField("password", password);
  populateField("passwordConfirmation", password);
  const form = screen.getByTestId("form") as HTMLButtonElement;
  fireEvent.submit(form);
  await waitFor(() => form);
}
