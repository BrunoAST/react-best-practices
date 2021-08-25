import {FieldValidation} from "../../protocols/field-validation";
import {InvalidEmailError} from "../../errors/invalid-email-error";

export class EmailValidation implements FieldValidation {
    constructor(readonly fieldName: string) {}

    validate(input: object): Error {
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        return (!input[this.fieldName] || emailRegex.test(input[this.fieldName])) ? null : new InvalidEmailError();
    }
}
