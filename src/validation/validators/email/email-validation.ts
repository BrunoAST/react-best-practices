import {FieldValidation} from "../../protocols/field-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

export class EmailValidation implements FieldValidation {
    constructor(readonly fieldName: string) {}

    validate(value: string): Error {
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return !emailRegex.test(value) ? new InvalidEmailError() : null;
    }
}
