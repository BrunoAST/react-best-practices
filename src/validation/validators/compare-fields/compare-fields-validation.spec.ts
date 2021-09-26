import faker from "faker";
import {CompareFieldsValidation} from "./compare-fields-validation";
import {InvalidFieldError} from "../../errors/invalid-field-error";

const makeSut = (fieldName: string, fieldToCompare: string): CompareFieldsValidation =>
    new CompareFieldsValidation(fieldName, fieldToCompare);

let fieldName: string = "";
let fieldToCompare: string = "";
beforeEach(() => {
    fieldName = faker.database.column();
    fieldToCompare = faker.database.column();
});

describe("CompareFieldsValidation", () => {
    it("Should return error if compare is invalid", () => {
        const sut = makeSut(fieldName, fieldToCompare);
        const error = sut.validate({
            [fieldName]: faker.random.words(3),
            [fieldToCompare]: faker.random.words(4),
        });
        expect(error).toEqual(new InvalidFieldError());
    });

    it("Should return falsy if compare is valid", () => {
        const value = faker.random.word();
        const sut = makeSut(fieldName, fieldToCompare);
        const error = sut.validate({
            [fieldName]: value,
            [fieldToCompare]: value,
        });
        expect(error).toBeFalsy();
    });
});
