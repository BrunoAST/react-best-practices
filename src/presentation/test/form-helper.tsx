import {fireEvent, RenderResult} from "@testing-library/react";
import faker from "faker";

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || "Tudo certo");
    expect(fieldStatus.textContent).toBe(validationError ? "🔴" : "🟢");
}

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.childElementCount).toBe(count);
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

export const populateField = (sut: RenderResult, fieldName: string, value: string = faker.random.word()): void => {
    const input = sut.getByTestId(fieldName);
    fireEvent.input(input, {target: {value: value}});
}
