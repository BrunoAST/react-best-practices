import faker from "faker";
import {RequiredFieldValidation} from "./required-field-validation";
import {RequiredFieldError} from "../../errors/required-field-error";

const makeSut = (fieldName: string): RequiredFieldValidation => new RequiredFieldValidation(fieldName);

describe("RequiredFieldValidation", () => {
    it("Should return error if field is empty", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: ""});
        expect(error).toEqual(new RequiredFieldError());
    });

    it("Should return falsy if field is not empty", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: faker.random.words()});
        expect(error).toBeFalsy();
    });
});
