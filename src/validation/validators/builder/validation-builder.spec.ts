import faker from "faker";
import {RequiredFieldValidation} from "../required-field/required-field-validation";
import {ValidationBuilder} from "./validation-builder";
import {EmailValidation} from "../email/email-validation";
import {MinLengthValidation} from "../min-length/min-length-validation";

type SutTypes = {
    fieldName: string;
    minLength: number;
}

const makeSut = (): SutTypes => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number({max: 10});
    return {
        fieldName,
        minLength,
    }
}

describe("ValidationBuilder", () => {
    it("Should return RequiredFieldValidation", () => {
        const {fieldName} = makeSut();
        const validations = ValidationBuilder.field(fieldName).required().build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new RequiredFieldValidation(fieldName)]);
    });

    it("Should return EmailValidation", () => {
        const {fieldName} = makeSut();
        const validations = ValidationBuilder.field(fieldName).email().build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new EmailValidation(fieldName)]);
    });

    it("Should return MinLengthValidation", () => {
        const {fieldName, minLength} = makeSut();
        const validations = ValidationBuilder.field(fieldName).minLength(minLength).build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)]);
    });

    it("Should return a list of validations", () => {
        const {fieldName, minLength} = makeSut();
        const validations = ValidationBuilder.field(fieldName)
            .required().email().minLength(minLength)
            .build();
        expect(validations.length).toBe(3);
        expect(validations).toEqual([
            new RequiredFieldValidation(fieldName),
            new EmailValidation(fieldName),
            new MinLengthValidation(fieldName, minLength),
        ]);
    });
});
