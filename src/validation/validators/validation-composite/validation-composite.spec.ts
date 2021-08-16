import {ValidationComposite} from "./validation-composite";
import {FieldValidationSpy} from "../test/mock-field-validation";

describe("ValidationComposite", () => {
    it("Should return error if any validation fails", () => {
        const fieldValidationSpy = new FieldValidationSpy("field");
        fieldValidationSpy.error = new Error("first_error_message");
        const fieldValidationSpy2 = new FieldValidationSpy("field");
        fieldValidationSpy2.error = new Error("second_error_message");
        const sut = new ValidationComposite([
            fieldValidationSpy,
            fieldValidationSpy2,
        ]);
        const error = sut.validate("field", "value");
        expect(error).toBe("first_error_message");
    });
});
