import faker from "faker";
import {EmailValidation} from "./email-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

const makeSut = (): EmailValidation => new EmailValidation(faker.database.column());

describe("EmailValidation", () => {
    it("Should return error if email is invalid", () => {
        const sut = makeSut();
        const error = sut.validate(faker.random.word());
        expect(error).toEqual(new InvalidEmailError());
    });

    it("Should return falsy if email is valid", () => {
        const sut = makeSut();
        const error = sut.validate(faker.internet.email());
        expect(error).toBeFalsy();
    });
});
