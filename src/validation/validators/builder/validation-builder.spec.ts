import {RequiredFieldValidation} from "../required-field/required-field-validation";
import {ValidationBuilder} from "./validation-builder";
import {EmailValidation} from "../email/email-validation";

describe("ValidationBuilder", () => {
    it("Should return RequiredFieldValidation", () => {
        const validations = ValidationBuilder.field("any_field").required().build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
    });

    it("Should return EmailValidation", () => {
        const validations = ValidationBuilder.field("any_field").email().build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new EmailValidation("any_field")]);
    });
});
