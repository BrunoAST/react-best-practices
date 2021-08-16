import {MinLengthError} from "../../errors/min-length-error";
import {MinLengthValidation} from "./min-length-validation";
import faker from "faker";

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5);

describe("MinLengthValidation", () => {
    it("Should return error if value is invalid", () => {
        const sut = makeSut();
        const error = sut.validate(faker.datatype.string(4));
        expect(error).toEqual(new MinLengthError(5));
    });

    it("Should return falsy if value is valid", () => {
        const sut = makeSut();
        const error = sut.validate(faker.datatype.string(5));
        expect(error).toBeFalsy();
    });
});
