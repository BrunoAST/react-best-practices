import {FieldValidation} from "../../protocols/field-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

export class EmailValidation implements FieldValidation {
    constructor(readonly fieldName: string) {}

    validate(value: string): Error {
        return new InvalidEmailError();
    }
}
