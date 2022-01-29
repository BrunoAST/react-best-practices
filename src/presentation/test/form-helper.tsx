import { fireEvent, RenderResult, screen } from "@testing-library/react";
import faker from "faker";

export const testStatusForField = (fieldName: string, validationError: string = ""): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`);
  const field = screen.getByTestId(fieldName);
  const label = screen.getByTestId(`${fieldName}-label`);
  expect(wrap.getAttribute("data-status")).toBe(validationError ? "invalid" : "valid");
  expect(field.title).toBe(validationError);
  expect(label.title).toBe(validationError);
}

export const testChildCount = (fieldName: string, count: number): void => {
  const element = screen.getByTestId(fieldName);
  expect(element.childElementCount).toBe(count);
}

export const testElementExists = (fieldName: string): void => {
  const element = screen.getByTestId(fieldName);
  expect(element).toBeTruthy();
}

export const testElementText = (fieldName: string, text: string): void => {
  const element = screen.getByTestId(fieldName);
  expect(element.textContent).toBe(text);
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
}

export const populateField = (fieldName: string, value: string = faker.datatype.string(10)): void => {
  const input = screen.getByTestId(fieldName);
  fireEvent.input(input, { target: { value: value } });
}
