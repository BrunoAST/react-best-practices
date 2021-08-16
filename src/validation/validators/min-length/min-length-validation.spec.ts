import {MinLengthError} from "../../errors/min-length-error";
import {MinLengthValidation} from "./min-length-validation";

describe("MinLengthValidation", () => {
    it("Should return error if value is invalid", () => {
        const minLength = 5;
        const sut = new MinLengthValidation("field", minLength);
        const error = sut.validate("123");
        expect(error).toEqual(new MinLengthError(minLength));
    });

    it("Should return falsy if value is valid", () => {
        const minLength = 5;
        const sut = new MinLengthValidation("field", minLength);
        const error = sut.validate("12345");
        expect(error).toBeFalsy();
    });
});
