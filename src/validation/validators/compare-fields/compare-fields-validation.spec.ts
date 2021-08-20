import faker from "faker";
import {CompareFieldsValidation} from "./compare-fields-validation";
import {InvalidFieldError} from "../../errors/invalid-field-error";

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
    new CompareFieldsValidation(faker.database.column(), valueToCompare);

describe("CompareFieldsValidation", () => {
    it("Should return error if compare is empty", () => {
        const sut = makeSut(faker.random.word());
        const error = sut.validate(faker.random.word());
        expect(error).toEqual(new InvalidFieldError());
    });

    it("Should return falsy if compare is valid", () => {
        const value = faker.random.word();
        const sut = makeSut(value);
        const error = sut.validate(value);
        expect(error).toBeFalsy();
    });
});
