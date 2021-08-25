import {FieldValidation} from "../../protocols/field-validation";
import {RequiredFieldError} from "../../errors/required-field-error";

export class RequiredFieldValidation implements FieldValidation {
    constructor(readonly fieldName: string) {}

    validate(input: object): Error {
        return !input[this.fieldName] ? new RequiredFieldError() : null;
    }
}
