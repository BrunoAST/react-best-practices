import faker from "faker";
import {RequiredFieldValidation} from "../required-field/required-field-validation";
import {ValidationBuilder} from "./validation-builder";
import {EmailValidation} from "../email/email-validation";
import {MinLengthValidation} from "../min-length/min-length-validation";
import {CompareFieldsValidation} from "../compare-fields/compare-fields-validation";

type SutTypes = {
    fieldName: string;
    fieldToCompare: string;
    minLength: number;
}

const makeSut = (fieldName = faker.database.column(), fieldToCompare = faker.database.column()): SutTypes => {
    const minLength = faker.datatype.number({max: 10});
    return {
        fieldName,
        fieldToCompare,
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

    it("Should return default minLength if none is passed", () => {
        const {fieldName} = makeSut();
        const validations = ValidationBuilder.field(fieldName).minLength().build();
        expect(validations.length).toBe(1);
        expect(validations).toEqual([new MinLengthValidation(fieldName, 0)]);
    });

    it("Should return CompareFieldsValidation", () => {
        const {fieldName, fieldToCompare} = makeSut();
        const validations = ValidationBuilder.field(fieldName).sameAs(fieldToCompare).build();
        expect(validations).toEqual([new CompareFieldsValidation(fieldName, fieldToCompare)]);
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
