import {EmailValidation} from "./email-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

describe("EmailValidation", () => {
    it("Should return error if email is invalid", () => {
        const sut = new EmailValidation("email");
        const error = sut.validate("");
        expect(error).toEqual(new InvalidEmailError());
    });
});
