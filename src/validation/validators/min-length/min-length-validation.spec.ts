import faker from "faker";
import {MinLengthError} from "../../errors/min-length-error";
import {MinLengthValidation} from "./min-length-validation";

const makeSut = (fieldName: string): MinLengthValidation => new MinLengthValidation(fieldName, 5);

describe("MinLengthValidation", () => {
    it("Should return error if value is invalid", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: faker.datatype.string(4)});
        expect(error).toEqual(new MinLengthError(5));
    });

    it("Should return falsy if value is valid", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: faker.datatype.string(5)});
        expect(error).toBeFalsy();
    });

    it("Should return falsy if fieldName does not exists in schema", () => {
        const fieldName = faker.database.column();
        const nonExistedField = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[nonExistedField]: faker.datatype.string(5)});
        expect(error).toBeFalsy();
    });
});
