import {ValidationComposite} from "./validation-composite";
import {FieldValidationSpy} from "../test/mock-field-validation";

type SutTypes = {
    sut: ValidationComposite;
    fieldValidationsSpy: FieldValidationSpy[];
}

const makeSut = (): SutTypes => {
    const fieldValidationsSpy = [
        new FieldValidationSpy("field"),
        new FieldValidationSpy("field"),
    ];
    const sut = new ValidationComposite(fieldValidationsSpy);
    return {
        sut,
        fieldValidationsSpy,
    }
}

describe("ValidationComposite", () => {
    it("Should return error if any validation fails", () => {
        const {sut, fieldValidationsSpy} = makeSut();
        fieldValidationsSpy[0].error = new Error("first_error_message");
        fieldValidationsSpy[1].error = new Error("second_error_message");
        const error = sut.validate("field", "value");
        expect(error).toBe("first_error_message");
    });
});
