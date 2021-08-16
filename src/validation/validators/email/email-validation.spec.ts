import faker from "faker";
import {EmailValidation} from "./email-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

describe("EmailValidation", () => {
    it("Should return error if email is invalid", () => {
        const sut = new EmailValidation(faker.database.column());
        const error = sut.validate(faker.random.word());
        expect(error).toEqual(new InvalidEmailError());
    });

    it("Should return falsy if email is valid", () => {
        const sut = new EmailValidation(faker.database.column());
        const error = sut.validate(faker.internet.email());
        expect(error).toBeFalsy();
    });
});
