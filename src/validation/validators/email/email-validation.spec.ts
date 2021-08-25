import faker from "faker";
import {EmailValidation} from "./email-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

const makeSut = (fieldName: string): EmailValidation => new EmailValidation(fieldName);

describe("EmailValidation", () => {
    it("Should return error if email is invalid", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: faker.random.word()});
        expect(error).toEqual(new InvalidEmailError());
    });

    it("Should return falsy if email is valid", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: faker.internet.email()});
        expect(error).toBeFalsy();
    });

    it("Should return falsy if email is empty", () => {
        const fieldName = faker.database.column();
        const sut = makeSut(fieldName);
        const error = sut.validate({[fieldName]: ""});
        expect(error).toBeFalsy();
    });
});
